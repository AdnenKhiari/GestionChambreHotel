import oracledb from "oracledb"

export const InitialisePoolConnection = () => {
    const dbConfig : oracledb.PoolAttributes = {
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        connectString:process.env.DB_CONNECT,
        poolIncrement: 0,
        poolMin: 4,
        poolMax: 4
    }
    return oracledb.createPool(dbConfig)
}
