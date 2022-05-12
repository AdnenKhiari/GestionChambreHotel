import  oracledb from 'oracledb';
import { execute } from "../../lib/QueryExecutor"
const pagelim = 8
export const GetRoomsInfo = async (data : any) : Promise<any> => {
    try{

        var STATEMENT = `SELECT id,room_number,capacity,type,options,state FROM ROOMS`
        const filters  = []
        const binds : oracledb.BindParameters = { pagenum : { val : 0}, pagelim : {val : pagelim}}

        //for pagination
        if(data.pagenum){
            binds["pagenum"]={val: data.pagenum}
        }

        if(data.id ){
            filters.push("id=:id")
            binds["id"]={val: data.id}
        }else if( data.room_number ){
            filters.push("room_number=:room_number")
            binds["room_number"]={val: data.room_number}
        }else{
            if(data.capacity){
                filters.push("capacity=:capacity")
                binds["capacity"]={val: data.capacity}
            }
            if(data.type){
                filters.push("type=:type")
                binds["type"]={val: data.type}
            }
            if(data.options){
                filters.push("options=:options")
                binds["options"]={val: data.options}
            }
            if(data.state){
                filters.push("state=:state")
                binds["state"]={val: data.state}
            }
        }
        const FILTERS_STATEMENT = filters.map((dt)=>'('+dt+')').join(' AND ')
        if(FILTERS_STATEMENT !== ''){
            STATEMENT+= '\n WHERE ' + FILTERS_STATEMENT
        }

        STATEMENT += `\n OFFSET :pagenum * :pagelim ROWS FETCH FIRST :pagelim ROWS ONLY`
        const searchCount : oracledb.Result<any> = await execute("SELECT COUNT(id) FROM ROOMS")
        const result : oracledb.Result<any> = await execute(STATEMENT,binds)

        return Promise.resolve({searchCount : searchCount?.rows?.at(0)[0], data : result.rows})

    }catch(err){
        return Promise.reject(err)
    }
}
export const GetRoomsHistory = async (data : any) : Promise<any> => {
    return Promise.resolve([])
}
export const GetRoomById = async (data : any) : Promise<any> => {
    try{
        const STATEMENT = `SELECT id as "id",
        room_number as "room_number",
        capacity as "capacity",
        type as "type",
        options as "options",
        state as "state"
        FROM ROOMS
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


export const AddRoom = async (data : any) : Promise<any> => {

    const STATEMENT = `INSERT INTO ROOMS VALUES (null,:room_number,:capacity,:type,:options,:state)`
    console.log("hii guys")

    try{
        const binds : oracledb.BindParameters = {
            room_number : {val: data.room_number,dir: oracledb.BIND_IN},
            capacity : {val: data.capacity,dir: oracledb.BIND_IN},
            type : {val: data.type,dir: oracledb.BIND_IN},
            options : {val: data.options,dir: oracledb.BIND_IN},
            state : {val: data.state,dir: oracledb.BIND_IN}
        }
        const result : oracledb.Result<any> = await execute(STATEMENT,binds,{autoCommit: true})
       return Promise.resolve(result)
    }catch(err){
        return Promise.reject(err)
    }
}

export const UpdateRoom = async (data : any) : Promise<any> => {

    const STATEMENT = `UPDATE ROOMS SET 
    room_number=:room_number,
    capacity=:capacity,
    type=:type,
    options=:options,   
    state=:state

    WHERE id=:id
    `

    try{
        const binds : oracledb.BindParameters = {
            id : {val : data.id},
            room_number : {val: data.room_number,dir: oracledb.BIND_IN},
            capacity : {val: data.capacity,dir: oracledb.BIND_IN},
            type : {val: data.type,dir: oracledb.BIND_IN},
            options : {val: data.options,dir: oracledb.BIND_IN},
            state : {val: data.state,dir: oracledb.BIND_IN}
        }

        const result : any = await execute(STATEMENT,binds,{autoCommit: true})

       return Promise.resolve(result)
    }catch(err){
        return Promise.reject(err)
    }
}

export const RemoveRoom = async (data : any) : Promise<boolean> => {
    const STATEMENT = `DELETE FROM ROOMS WHERE id=:id`
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