import { exec } from 'child_process';
import OracleDB, { maxRows } from 'oracledb';
import  oracledb from 'oracledb';
import {IClientInfoOutput} from "../../lib/interfaces/Clients"
import { execute } from "../../lib/QueryExecutor"
import moment from 'moment';
import { formate_date } from '../../lib/utils';
const pagelim = 8
export const GetClientInfo = async (data : any) : Promise<any> => {
    try{

        var STATEMENT = `SELECT id,fullname,cin,date_of_birth,gender FROM CLIENTS `
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
                const dt = formate_date(data.date_of_birth)
                filters.push("TO_CHAR(date_of_birth,'DD/MM/YYYY')=:date_of_birth")
                binds["date_of_birth"]={val:dt ,type: oracledb.STRING}
            }
        }
        const FILTERS_STATEMENT = filters.map((dt)=>'('+dt+')').join(' AND ')
        if(FILTERS_STATEMENT !== ''){
            STATEMENT+= '\n WHERE ' + FILTERS_STATEMENT
        }

        STATEMENT += `\n OFFSET :pagenum * :pagelim ROWS FETCH FIRST :pagelim ROWS ONLY`
   //     console.log(STATEMENT)
        const searchCount : oracledb.Result<any> = await execute("SELECT COUNT(id) FROM CLIENTS")
        const result : oracledb.Result<any> = await execute(STATEMENT,binds)

        //format the date:
        result.rows?.forEach(row=>{
            row[3] = formate_date(row[3])
        })
        return Promise.resolve({searchCount : searchCount?.rows?.at(0)[0], data : result.rows})

    }catch(err){
        return Promise.reject(err)
    }
}

export const GetClientById = async ( data: any) : Promise<any> =>{
    try{
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
        const result : OracleDB.Result<any> = await execute(STATEMENT,binds,{outFormat: oracledb.OUT_FORMAT_OBJECT});

        return Promise.resolve(result.rows?.at(0))
        
    }catch(error){
        return Promise.reject(error)
    }
}
export const GetClientHistory = async (data : any) : Promise<any> => {
    try{
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
        console.log(STATEMENT)
   //     console.log(STATEMENT)
        const searchCount : oracledb.Result<any> = await execute("SELECT COUNT(id) FROM CLIENTS")
        const result : oracledb.Result<any> = await execute(STATEMENT,binds)

        //format the date:
        result.rows?.forEach(row=>{
            row[3] = formate_date(row[3])
            row[2] = formate_date(row[2])
        })
        return Promise.resolve({searchCount : searchCount?.rows?.at(0)[0], data : result.rows})

    }catch(err){
        return Promise.reject(err)
    }
}

export const AddClient = async (data : any) : Promise<any> => {
    const STATEMENT = `INSERT INTO CLIENTS VALUES (NULL,:fullname,:address,TO_DATE(:date_of_birth,'DD/MM/YYYY'),:cin,:job,:gender,:state)        `
    try{
        const binds : oracledb.BindParameters = {
            fullname : {val: data.fullname,dir: oracledb.BIND_IN},
            address : {val: data.address,dir: oracledb.BIND_IN},
            date_of_birth : {val: formate_date(data.date_of_birth),dir: oracledb.BIND_IN},
            cin : {val: data.cin,dir: oracledb.BIND_IN},
            gender : {val: data.gender,dir: oracledb.BIND_IN},
            state : {val: data.state,dir: oracledb.BIND_IN},
            job: {val : null}
        }
        if(data.job !== undefined){
            binds["job"] = {val: data.job,dir: oracledb.BIND_IN}
        }
        const result : OracleDB.Result<any> = await execute(STATEMENT,binds,{autoCommit: true})

       return Promise.resolve(result)
    }catch(err){
        return Promise.reject(err)
    }
}

export const UpdateClient = async (data : any) : Promise<any> => {
    const STATEMENT = `UPDATE CLIENTS SET fullname=:fullname,
    address=:address,
    date_of_birth=TO_DATE(:date_of_birth,'DD/MM/YYYY'),
    cin=:cin,
    job=:job,
    gender=:gender,
    state=:state
    WHERE id=:id
    `
    try{
        const binds : oracledb.BindParameters = {
            id : {val : data.id},
            fullname : {val: data.fullname,dir: oracledb.BIND_IN},
            address : {val: data.address,dir: oracledb.BIND_IN},
            date_of_birth : {val: formate_date(data.date_of_birth),dir: oracledb.BIND_IN},
            cin : {val: data.cin,dir: oracledb.BIND_IN},
            gender : {val: data.gender,dir: oracledb.BIND_IN},
            state : {val: data.state,dir: oracledb.BIND_IN},
            job: {val : null}
        }
        console.log(binds)
        if(data.job != undefined){
            binds["job"] = {val: data.job,dir: oracledb.BIND_IN}
        }
        const result : any = await execute(STATEMENT,binds,{autoCommit: true})

       return Promise.resolve(result)
    }catch(err){
        return Promise.reject(err)
    }
}

export const RemoveClient = async (data : any) : Promise<boolean> => {
    const STATEMENT = `DELETE FROM CLIENTS WHERE id=:id`
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