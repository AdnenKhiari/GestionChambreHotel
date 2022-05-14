import  oracledb from 'oracledb';
import { execute } from "../../lib/QueryExecutor"
import { formate_date } from '../../lib/utils';

const pagelim = 8
export const GetOffersInfo = async (data : any) : Promise<any> => {
    try{

        var STATEMENT = `SELECT id,name,date_start,date_end,price FROM OFFERS `
        const filters  = []
        const binds : oracledb.BindParameters = { pagenum : { val : 0}, pagelim : {val : pagelim}}

        if(Object.keys(data).length > 0){

        
        //for pagination
        if(data.pagenum){
            binds["pagenum"]={val: data.pagenum}
        }

        if(data.id){
            filters.push("id=:id")
            binds["id"]={val: data.id}
        }else{

            if(data.name){
                filters.push("name LIKE :name")
                binds["name"]={val: '%'+data.name+'%'}
            }
            if(data.price){
                filters.push("price=:price")
                binds["price"]={val: data.price}
            }
            if(data.date_start ){
                const dt = formate_date(data.date_start)
                filters.push("TO_CHAR(date_start,'DD/MM/YYYY')=:date_start")
                binds["date_start"]={val:dt ,type: oracledb.STRING}
            }
            if(data.date_end !== null){
                if(data.date_end === null){
                    binds["date_end"] = {val: null}
                }else if(data.date_end != ''){
                    const dt = formate_date(data.date_end)
                    filters.push("TO_CHAR(date_end,'DD/MM/YYYY')=:date_end")
                    binds["date_end"]={val:dt ,type: oracledb.STRING}
                }
            }
        }
        const FILTERS_STATEMENT = filters.map((dt)=>'('+dt+')').join(' AND ')
        if(FILTERS_STATEMENT !== ''){
            STATEMENT+= '\n WHERE ' + FILTERS_STATEMENT
        }
    }

        STATEMENT += `\n OFFSET :pagenum * :pagelim ROWS FETCH FIRST :pagelim ROWS ONLY`
        console.log(STATEMENT)
        const searchCount : oracledb.Result<any> = await execute("SELECT COUNT(id) FROM OFFERS")
        const result : oracledb.Result<any> = await execute(STATEMENT,binds)

        //format the date:
        result.rows?.forEach(row=>{
            if(row[3] !== null )
                row[3] = formate_date(row[3])
            row[2] = formate_date(row[2])
        })
        return Promise.resolve({searchCount : searchCount?.rows?.at(0)[0], data : result.rows})

    }catch(err){
        return Promise.reject(err)
    }
}


export const GetOfferById = async ( data: any) : Promise<any> =>{
    try{
        const STATEMENT = `SELECT id as "id",
            name as "name",
            description as "description",
            TO_CHAR(date_start,'DD-MM-YYYY') as "date_start",
            TO_CHAR(date_end,'DD-MM-YYYY') as "date_end",
            price as "price"
        FROM OFFERS 
        WHERE id=:id`
        const binds = {
            id : {val: data.id}
        }
        const result : oracledb.Result<any> = await execute(STATEMENT,binds,{outFormat: oracledb.OUT_FORMAT_OBJECT});
        return Promise.resolve(result.rows?.at(0))
        
    }catch(error){
        return Promise.reject(error)
    }
}

export const GetOffersHistory = async ( data: any) => {
    let STATEMENT = `SELECT b.id,r.room_number,b.date_checkin,b.date_checkout
    FROM BOOKINGS b,BOOKING_ROOMS_ALLOCATION bra,ROOMS_ALLOCATION ra, ROOMS r
    WHERE b.id = bra.booking_id AND bra.allocated_room_id = ra.id AND ra.room_id=r.id AND ra.offer_id=:id
    `


    const filters  = []
    const binds : oracledb.BindParameters = { pagenum : { val : 0}, pagelim : {val : pagelim},id : {val: data.id}}

        //for pagination
        if(data.pagenum){
            binds["pagenum"]={val: data.pagenum}
        }

        if(data.room_number ){
            filters.push("r.room_number=:room_number")
            binds["room_number"]={val: data.room_number}
        }
        if(data.bookingId){
            filters.push("b.id=:booking_id")
            binds["booking_id"]={val: data.bookingId}
        }
        if(data.date_checkin ){
            const dt = formate_date(data.date_checkin)
            filters.push("TO_CHAR(b.date_checkin,'DD/MM/YYYY')=:date_checkin")
            binds["date_checkin"]={val:dt ,type: oracledb.STRING}
        }
        if(data.date_checkout ){
            const dt = formate_date(data.date_checkout)
            filters.push("TO_CHAR(b.date_checkout,'DD/MM/YYYY')=:date_checkout")
            binds["date_checkout"]={val:dt ,type: oracledb.STRING}
        }
    
    const FILTERS_STATEMENT = filters.map((dt)=>'('+dt+')').join(' AND ')
    if(FILTERS_STATEMENT !== ''){
        STATEMENT+= '\n AND ' + FILTERS_STATEMENT
    }

    STATEMENT += `\n OFFSET (:pagenum * :pagelim) ROWS FETCH FIRST :pagelim ROWS ONLY`
    console.log(STATEMENT)
//     console.log(STATEMENT)



    const result = await execute(STATEMENT,binds);
        //format the date:
        result.rows?.forEach(row=>{
            row[3] = formate_date(row[3])
            row[2] = formate_date(row[2])
        })
    return {searchCount : 4, data : result.rows}
}

export const AddOffer = async (data : any) : Promise<any> => {
    const STATEMENT = `INSERT INTO OFFERS VALUES (null,:name,:description,TO_DATE(:date_start,'DD/MM/YYYY'),TO_DATE(:date_end,'DD/MM/YYYY'),:price)`
    console.log(data)
    try{
        const binds : oracledb.BindParameters = {
            name : {val: data.name,dir: oracledb.BIND_IN},
            description : {val: data.description,dir: oracledb.BIND_IN},
            date_start : {val: formate_date(data.date_start),dir: oracledb.BIND_IN},
            price : {val: data.price,dir: oracledb.BIND_IN},
            date_end: {val : null}
        }
        if(data.date_end !== undefined){
            console.log("de")
            binds["date_end"] =  {val: formate_date(data.date_end),dir: oracledb.BIND_IN}
        }

        const result : oracledb.Result<any> = await execute(STATEMENT,binds,{autoCommit: true})
       return Promise.resolve(result)
    }catch(err){
        return Promise.reject(err)
    }
}

export const UpdateOffer = async (data : any) : Promise<any> => {

    const STATEMENT = `UPDATE OFFERS SET 
    name = :name,
    description=:description,
    date_start=TO_DATE(:date_start,'DD/MM/YYYY'),
    date_end=TO_DATE(:date_end,'DD/MM/YYYY'),
    price=:price
    WHERE id=:id
    `
    try{
        const binds : oracledb.BindParameters = {
            id : {val : data.id},
            name : {val : data.name},
            description : {val: data.description,dir: oracledb.BIND_IN},
            date_start : {val: formate_date(data.date_start),dir: oracledb.BIND_IN},
            price : {val: data.price,dir: oracledb.BIND_IN},
            date_end : {val : null}
        }
        if(data.date_end != undefined){
            data["date_end"] = {date_end : {val: formate_date(data.date_end),dir: oracledb.BIND_IN}}
        }
        const result : any = await execute(STATEMENT,binds,{autoCommit: true})

       return Promise.resolve(result)
    }catch(err){
        return Promise.reject(err)
    }
}

export const RemoveOffer = async (data : any) : Promise<boolean> => {
    const STATEMENT = `DELETE FROM OFFERS WHERE id=:id`
    try{
        const binds : oracledb.BindParameters = {
            id : {val: data.id,dir: oracledb.BIND_IN},
        }
        const result : oracledb.Result<any> = await execute(STATEMENT,binds,{autoCommit: true})
       return Promise.resolve(result.rowsAffected === 1)
    }catch(err){
        return Promise.reject(err)
    }
}