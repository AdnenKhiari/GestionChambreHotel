import oracledb,{ExecuteOptions} from "oracledb"

//var pool : oracledb.Pool | null = null;

export const Init =  ()=>{
    //pool =  oracledb.getPool("default")
}
const dbConfig = {password: "oracle",user: "system",connectString:"localhost/xe"}
export const getClassInDb = (name: string) => new Promise<any>(async (resolve,reject)=>{
    let connection = null;
    try{
        connection = await oracledb.getConnection(dbConfig)
        const custom_type : oracledb.DBObjectClass<any> = await connection.getDbObjectClass(name);
        return resolve(custom_type)
    }catch(err){
        console.log("FAMECH")
        return reject(err)
    }/*finally{
    if(connection){
// release connection bug is bugged !
            try{
                await connection?.release()
            }catch(errc){
                console.log("err in release")
                return reject(errc) 
            } 
        }
    }*/
})
export const execute = (STATEMENT : string,data : oracledb.BindParameters  = {},options : oracledb.ExecuteOptions = {})=> new Promise<oracledb.Result<any>>(async (resolve,reject)=>{
    let connection = null;
    try{
        connection = await oracledb.getConnection(dbConfig)
        let result  = await connection?.execute(STATEMENT,data,options)
        return resolve(result)
    }catch(err){
        return reject(err)
    }finally{
        if(connection){
// release connection bug is bugged !
    /*try{
        await connection?.release()
    }catch(errc){
        console.log("err in release")
        return reject(errc) 
    } */
        }
    }
 })

export const testConnection = ()=>{
    
}