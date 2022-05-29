import oracledb from "oracledb"

export const execute = (STATEMENT : string,data : oracledb.BindParameters  = {},options : oracledb.ExecuteOptions = {})=> new Promise<oracledb.Result<any>>(async (resolve,reject)=>{
    let connection = null;
    try{
        connection = await oracledb.getConnection()
        let result  = await connection?.execute(STATEMENT,data,options)
        return resolve(result)
    }catch(err){
        return reject(err)
    }finally{
        if(connection){
            try{
                await connection?.close()
            }catch(errc){
                return reject(errc) 
            } 
        }
    }
 })

 export const getClassInDb = (name: string) => new Promise<any>(async (resolve,reject)=>{
    let connection = null;
    try{
        connection = await oracledb.getConnection()
        const custom_type : oracledb.DBObjectClass<any> = await connection.getDbObjectClass(name);
        return resolve(custom_type)
    }catch(err){
        return reject(err)
    }finally{
        if(connection){
            try{
                await connection?.close()
            }catch(errc){
                return reject(errc) 
            } 
        }
    }
})