import oracledb from 'oracledb';
import { execute } from "../../lib/QueryExecutor"

export const LoginUser = async (email: string) : Promise<User | null> =>{
    const STATEMENT = `SELECT id as "id",fullname as "fullname",password as "password" FROM USERS WHERE email=:email`
    const binds = {
        email: {val: email,dir: oracledb.BIND_IN}
    }
    const result : oracledb.Result<User> = await execute(STATEMENT,binds,{autoCommit:true,outFormat: oracledb.OUT_FORMAT_OBJECT});
    if(result.rows?.length === 0)
        return null
    return result.rows?.at(0) as User;
}

export const CreateUser = async (data: User) =>{
    const STATEMENT = `
    DECLARE
    e EXCEPTION;
    BEGIN
        INSERT INTO USERS VALUES (null,:fullname,:email,:password,'A')
        RETURNING id INTO :id;
        IF SQL%ROWCOUNT = 0 THEN
            raise_application_error(-20000, 'Nothing has been inserted for USERS');
        END IF;
    END;
    `
    const binds = {
        fullname: {val: data.fullname},
        email: {val: data.email},
        password: {val: data.password},
        id: {dir: oracledb.BIND_OUT,type: oracledb.NUMBER}
    }
    const result = await execute(STATEMENT,binds,{autoCommit:true,outFormat: oracledb.OUT_FORMAT_OBJECT});
    return {id: result.outBinds.id,fullname: data.fullname};
}

export const  AddSSID = async (ssid: string,id: number) : Promise<void> =>{
    const STATEMENT = `INSERT INTO SSIDS VALUES (:ssid,:id)`
    const binds = {
        ssid: {val: ssid},
        id: {val: id},
    }
    const result = await execute(STATEMENT,binds,{autoCommit:true,outFormat: oracledb.OUT_FORMAT_OBJECT});
}

export const  GetUserBySSID = async (ssid: string) : Promise<User | null> =>{
    const STATEMENT = `SELECT id as "id",fullname as "fullname" FROM USERS u,SSIDS s WHERE u.id=s.user_id AND s.ssid = :ssid`
    const binds = {
        ssid: {val: ssid,dir: oracledb.BIND_IN}
    }
    const result  : oracledb.Result<User> = await execute(STATEMENT,binds,{outFormat: oracledb.OUT_FORMAT_OBJECT});
    if(result.rows?.length === 0)
        return null
    return result.rows?.at(0) as User;
}
