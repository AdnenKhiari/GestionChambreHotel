import oracledb from 'oracledb';
import { execute } from "../../lib/QueryExecutor"

export const LoginUser = async (email: string) =>{
    const STATEMENT = `SELECT id as "id",fullname as "fullname",password as "password" FROM USERS WHERE email=:email`
    const binds = {
        email: {val: email,dir: oracledb.BIND_IN}
    }
    const result = await execute(STATEMENT,binds,{autoCommit:true,outFormat: oracledb.OUT_FORMAT_OBJECT});
    //console.log("RES",result)
    return result.rows?.at(0);
}

export const CreateUser = async (data: any) =>{
    const STATEMENT = `
    BEGIN
        INSERT INTO USERS VALUES (null,:fullname,:email,:password,'A')
        RETURNING id INTO :id;
    END;
    `
    const binds = {
        fullname: {val: data.fullname},
        email: {val: data.email},
        password: {val: data.password},
        id: {dir: oracledb.BIND_OUT,type: oracledb.NUMBER}
    }
    const result = await execute(STATEMENT,binds,{autoCommit:true,outFormat: oracledb.OUT_FORMAT_OBJECT});
    //console.log(result)
    return {id: result.outBinds.id,fullname: data.fullname};
}

export const  AddSSID = async (ssid: string,id: number)=>{
    const STATEMENT = `INSERT INTO SSIDS VALUES (:ssid,:id)`
    const binds = {
        ssid: {val: ssid},
        id: {val: id},
    }
    const result = await execute(STATEMENT,binds,{autoCommit:true,outFormat: oracledb.OUT_FORMAT_OBJECT});
    //console.log(result)
}

export const  GetUserBySSID = async (ssid: string)=>{
    const STATEMENT = `SELECT id as "id",fullname as "fullname" FROM USERS u,SSIDS s WHERE u.id=s.user_id AND s.ssid = :ssid`
    const binds = {
        ssid: {val: ssid,dir: oracledb.BIND_IN}
    }
    const result = await execute(STATEMENT,binds,{outFormat: oracledb.OUT_FORMAT_OBJECT});
    console.log("RES",result)
    return result.rows?.at(0);
}
