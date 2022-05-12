import * as datefns from "date-fns";
import oracledb, { BIND_OUT } from "oracledb";
import { resolve } from "path";
import { execute, getClassInDb } from "../../lib/QueryExecutor";
import { formate_date } from "../../lib/utils";
const pagelim = 8;

export const GetBookingInfo = async (data: any) =>{
    var STATEMENT = `SELECT id,name,date_checkin,date_checkout FROM BOOKINGS `;
    const filters = [];
    const binds: oracledb.BindParameters = {
      pagenum: { val: 0 },
      pagelim: { val: pagelim },
    };

    //for pagination
    if (data.pagenum) {
      binds["pagenum"] = { val: data.pagenum };
    }

    if (data.id) {
      filters.push("id=:id");
      binds["id"] = { val: data.id };
    } else {
      if (data.name) {
        filters.push("name LIKE :name");
        binds["name"] = { val: "%" + data.name + "%" };
      }
      if (data.date_checkout) {
        const dt = formate_date(data.date_checkout);
        filters.push("TO_CHAR(date_checkout,'DD/MM/YYYY')=:date_checkout");
        binds["date_checkout"] = { val: dt, type: oracledb.STRING };
      }
      if (data.date_checkin) {
        const dt = formate_date(data.date_checkin);
        filters.push("TO_CHAR(date_checkin,'DD/MM/YYYY')=:date_checkin");
        binds["date_checkin"] = { val: dt, type: oracledb.STRING };
      }
    }
    const FILTERS_STATEMENT = filters.map((dt) => "(" + dt + ")").join(" AND ");
    if (FILTERS_STATEMENT !== "") {
      STATEMENT += "\n WHERE " + FILTERS_STATEMENT;
    }

    STATEMENT += `\n OFFSET :pagenum * :pagelim ROWS FETCH FIRST :pagelim ROWS ONLY`;
    //     console.log(STATEMENT)
    const searchCount: oracledb.Result<any> = await execute(
      "SELECT COUNT(id) FROM CLIENTS"
    );
    const result: oracledb.Result<any> = await execute(STATEMENT, binds);

    //format the date:
    result.rows?.forEach((row) => {
      row[3] = formate_date(row[3]);
      row[2] = formate_date(row[2]);
    });
    return {
      searchCount: searchCount?.rows?.at(0)[0],
      data: result.rows,
    };
};

export const GetBookingById = async (data: any) =>{

    var STATEMENT = `
    DECLARE
    a NUMBER;
    BEGIN
      a:= :id;
      GestionHotel.get_booking_info(a,:res);
    END;`;
    const binds: oracledb.BindParameters = {
      res: { dir: oracledb.BIND_OUT, type: "GESTIONHOTEL.BOOKING_OBJ" },
      id: {val: data.id}
    };
    const result = await execute(STATEMENT, binds,{outFormat: oracledb.OUT_FORMAT_OBJECT});
    return result.outBinds.res;
};  

export const AddBooking = async (data : any)=>{

  var STATEMENT = `
  BEGIN
    GestionHotel.set_booking_info(:bk_data,:rm);
  END;`;
  data.BOOKING_DATA  =  getBookingObjectData(data.BOOKING_DATA)

  const binds: oracledb.BindParameters = {
    bk_data: {val: data.BOOKING_DATA,type: "GESTIONHOTEL.SET_BOOKING_OBJ" },
    rm: {val :data.ROOMS_TO_REMOVE,type: "GESTIONHOTEL.SET_REMOVED_ARR"}
  };
  const result = await execute(STATEMENT, binds,{outFormat: oracledb.OUT_FORMAT_OBJECT,autoCommit:true});
  return result
}


export const RemoveBooking = async (data : any)=>{
  //    -- GestionHotel.remove_room_bookings(:rm);
  var STATEMENT = `BEGIN
    GestionHotel.remove_booking(:id);
    DELETE FROM BOOKINGS WHERE BOOKINGS.id=:id;

  END;`;
  const binds: oracledb.BindParameters = {
    id: {val: data.id},
   /* rm  : {val: data.ROOMS_TO_REMOVE, type: "GESTIONHOTEL.SET_REMOVED_ARR" }*/
  };

  const result = await execute(STATEMENT, binds,{outFormat: oracledb.OUT_FORMAT_OBJECT,autoCommit:true});
  console.log(result)
  return result

}

export const ModBooking = async (data : any)=>{


  var STATEMENT = `
  BEGIN
    GestionHotel.set_booking_info(:bk_data,:rm);
  END;`;
  data.BOOKING_DATA  =  getBookingObjectData(data.BOOKING_DATA)

  const binds: oracledb.BindParameters = {
    bk_data: {val: data.BOOKING_DATA,type: "GESTIONHOTEL.SET_BOOKING_OBJ" },
    rm: {val :data.ROOMS_TO_REMOVE,type: "GESTIONHOTEL.SET_REMOVED_ARR"}
  };

  const result = await execute(STATEMENT, binds,{outFormat: oracledb.OUT_FORMAT_OBJECT,autoCommit:true});
  console.log(result)
  return result
}

const getBookingObjectData =  (data: any) => {
  if(!data.BOOKING_ID)
    data.BOOKING_ID = -1

   data.ROOMS.forEach((room: any)=>{
     if(!room.ALLOCATED_ROOM_ID)
       room.ALLOCATED_ROOM_ID = -1;
   })

    data.DATE_CHECKIN = new Date(data.DATE_CHECKIN)
    data.DATE_CHECKOUT= new Date(data.DATE_CHECKOUT)
   
   return data

}

