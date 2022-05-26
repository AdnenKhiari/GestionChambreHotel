import OracleDB, { maxRows } from 'oracledb';
import  oracledb from 'oracledb';
import { execute } from "../../lib/QueryExecutor"
import { formate_date } from '../../lib/utils';
import { StatusCodes } from 'http-status-codes';
import ApiError from "../../Errors/ApiError"
const pagelim = 8

export const GetClientInfo = async (data : ClientSearch) : Promise<PaginatedArr> => {

    var STATEMENT = `SELECT id,fullname,cin,date_of_birth,gender FROM CLIENTS`
    const filters  = []
    const binds : oracledb.BindParameters = { pagenum : { val : 0}, pagelim : {val : pagelim}}

    //for pagination
    if(data.pagenum){
        binds["pagenum"]={val: data.pagenum}
    }

    if(data.id ){
        filters.push("id=:id")
        binds["id"]={val: data.id}
    }else if( data.cin ){
        filters.push("cin=:cin")
        binds["cin"]={val: data.cin}
    }else{
        if(data.fullname){
            filters.push("fullname LIKE :fullname")
            binds["fullname"]={val: '%'+data.fullname+'%'}
        }
        if(data.gender){
            filters.push("gender=:gender")
            binds["gender"]={val: data.gender}
        }
        if(data.date_of_birth ){
            const dt = formate_date(data.date_of_birth as string)
            filters.push("TO_CHAR(date_of_birth,'DD/MM/YYYY')=:date_of_birth")
            binds["date_of_birth"]={val:dt ,type: oracledb.STRING}
        }
    }
    const FILTERS_STATEMENT = filters.map((dt)=>'('+dt+')').join(' AND ')
    if(FILTERS_STATEMENT !== ''){
        STATEMENT+= '\n WHERE ' + FILTERS_STATEMENT
    }

    STATEMENT += `\n OFFSET :pagenum * :pagelim ROWS FETCH FIRST :pagelim ROWS ONLY`
    const searchCount : oracledb.Result<any> = await execute("SELECT COUNT(id) FROM CLIENTS")
    const result : oracledb.Result<any> = await execute(STATEMENT,binds)

    //format the date:
    result.rows?.forEach(row=>{
        row[3] = formate_date(row[3])
    })
    return {searchCount : searchCount?.rows?.at(0)[0], data : result.rows}
}

export const GetClientById = async ( data: {id: number | string}) : Promise<Client | undefined> =>{

    const STATEMENT = `SELECT id as "id",
    address as "address",
    state as "state",
    gender as "gender",
    job as "job",
    cin as "cin",
    fullname as "fullname",
    TO_CHAR(date_of_birth,'DD-MM-YYYY') as "date_of_birth"
    FROM CLIENTS WHERE id=:id `
    const binds = {
        id : {val: data.id}
    }
    const result : OracleDB.Result<Client> = await execute(STATEMENT,binds,{outFormat: oracledb.OUT_FORMAT_OBJECT});
    if(result.rows?.length === 0){
        throw new ApiError(`Invalid Client ID ${data.id}`,null,StatusCodes.BAD_REQUEST)
    }
    return result.rows?.at(0) 
}

export const GetClientHistory = async (data : any ) : Promise<PaginatedArr> => {
        var STATEMENT = `SELECT b.id,r.room_number,b.date_checkin,b.date_checkout 
         FROM CLIENT_IN_ROOMS cir,BOOKING_ROOMS_ALLOCATION bra,BOOKINGS b,ROOMS_ALLOCATION ra,ROOMS r 
         WHERE r.id = ra.room_id 
         AND ra.id = bra.allocated_room_id 
         AND bra.allocated_room_id = cir.allocated_room_id 
         AND b.id = bra.booking_id 
         AND cir.client_id = :id`
        const filters  = []
        const binds : oracledb.BindParameters = { pagenum : { val : 0}, pagelim : {val : pagelim},id : {val: data.id}}

            //for pagination
            if(data.pagenum){
                binds["pagenum"]={val: data.pagenum}
            }

            if(data.booking_id ){
                filters.push("booking_id=:booking_id")
                binds["booking_id"]={val: data.booking_id}
            }
            if(data.room_id){
                filters.push("room_id=:room_id")
                binds["room_id"]={val: data.room_id}
            }
            if(data.date_checkin ){
                const dt = formate_date(data.date_checkin)
                filters.push("TO_CHAR(date_checkin,'DD/MM/YYYY')=:date_checkin")
                binds["date_checkin"]={val:dt ,type: oracledb.STRING}
            }
            if(data.date_checkout ){
                const dt = formate_date(data.date_checkout)
                filters.push("TO_CHAR(date_checkout,'DD/MM/YYYY')=:date_checkout")
                binds["date_checkout"]={val:dt ,type: oracledb.STRING}
            }
        
        const FILTERS_STATEMENT = filters.map((dt)=>'('+dt+')').join(' AND ')
        if(FILTERS_STATEMENT !== ''){
            STATEMENT+= '\n AND ' + FILTERS_STATEMENT
        }

        STATEMENT += `\n OFFSET (:pagenum * :pagelim) ROWS FETCH FIRST :pagelim ROWS ONLY`
        const searchCount : oracledb.Result<any> = await execute("SELECT COUNT(id) FROM CLIENTS")
        const result : oracledb.Result<any> = await execute(STATEMENT,binds)

        //format the date:
        result.rows?.forEach(row=>{
            row[3] = formate_date(row[3])
            row[2] = formate_date(row[2])
        })
        return {searchCount : searchCount?.rows?.at(0)[0], data : result.rows}
}

export const AddClient = async (data : Client) : Promise<any> => {
    const STATEMENT = `INSERT INTO CLIENTS VALUES (NULL,:fullname,:address,TO_DATE(:date_of_birth,'DD/MM/YYYY'),:cin,:job,:gender,:state)        `

    const binds : oracledb.BindParameters = {
        fullname : {val: data.fullname,dir: oracledb.BIND_IN},
        address : {val: data.address,dir: oracledb.BIND_IN},
        date_of_birth : {val: formate_date(data.date_of_birth as string),dir: oracledb.BIND_IN},
        cin : {val: data.cin,dir: oracledb.BIND_IN},
        gender : {val: data.gender,dir: oracledb.BIND_IN},
        state : {val: data.state,dir: oracledb.BIND_IN},
        job: {val : null}
    }
    if(data.job !== undefined){
        binds["job"] = {val: data.job,dir: oracledb.BIND_IN}
    }
    const result : OracleDB.Result<any> = await execute(STATEMENT,binds,{autoCommit: true})
    return result   
}

export const UpdateClient = async (data : Client) : Promise<void> => {
    const STATEMENT = `UPDATE CLIENTS SET fullname=:fullname,
    address=:address,
    date_of_birth=TO_DATE(:date_of_birth,'DD/MM/YYYY'),
    cin=:cin,
    job=:job,
    gender=:gender,
    state=:state
    WHERE id=:id
    `
    const binds : oracledb.BindParameters = {
        id : {val : data.id},
        fullname : {val: data.fullname,dir: oracledb.BIND_IN},
        address : {val: data.address,dir: oracledb.BIND_IN},
        date_of_birth : {val: formate_date(data.date_of_birth as string),dir: oracledb.BIND_IN},
        cin : {val: data.cin,dir: oracledb.BIND_IN},
        gender : {val: data.gender,dir: oracledb.BIND_IN},
        state : {val: data.state,dir: oracledb.BIND_IN},
        job: {val : null}
    }
    if(data.job != undefined){
        binds["job"] = {val: data.job,dir: oracledb.BIND_IN}
    }
    const result : any = await execute(STATEMENT,binds,{autoCommit: true})

    if(result.rowsAffected === 0){
        throw new ApiError(`Invalid Client ID ${data.id}`,null,StatusCodes.BAD_REQUEST)
    }
}

export const RemoveClient = async (data : {id: number | string}) : Promise<void> => {
    const STATEMENT = `DELETE FROM CLIENTS WHERE id=:id`

    const binds : oracledb.BindParameters = {
        id : {val: data.id,dir: oracledb.BIND_IN},
    }
    const result : oracledb.Result<any> = await execute(STATEMENT,binds,{autoCommit: true})
    if(result.rowsAffected === 0){
        throw new ApiError(`Invalid Client ID ${data.id}`,null,StatusCodes.BAD_REQUEST)
    }
}