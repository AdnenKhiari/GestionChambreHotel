import bodyParser from "body-parser"
import express,{Express,Request,Response} from "express"
import ApiControllers from "./controllers"
import cors from "cors"
import CookieParser from "cookie-parser"
import { ErrorHandler, HandleUnexpectedError } from "./Errors/ErrorHandler"
import oracledb, { getPool } from "oracledb"
import { ca } from "date-fns/locale"
//start an app instance
const app : Express = express()
require("dotenv").config()

//ready to accept json data
app.use(bodyParser.json())

//use cookie parser
app.use(CookieParser())

//cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


app.get("/",(req : Request,res : Response)=>{
    res.send("Hii")
})

app.use("/api",ApiControllers);

app.use(ErrorHandler)

const dbConfig : oracledb.PoolAttributes = {
    password: "oracle",
    user: "system",
    connectString:"localhost/xe",
    poolIncrement: 0,
    poolMin: 4,
    poolMax: 4
}

const InitServer = async ()=>{
    try{
        //create db pool
        await oracledb.createPool(dbConfig)
        app.listen(process.env.SERVER_PORT,()=>{
            console.log("Working fine !")  
        })
    }catch(err){
        HandleUnexpectedError(err as Error,1)
    }
}

//Start the db connections and server
InitServer()


process.on("unhandledRejection",(reason: Error, promise: Promise<any>) => {
    throw reason;
})

process.on("uncaughtException", (error: Error) => {
    HandleUnexpectedError(error,1)
});

process.on("beforeExit",()=>{
    try{
        getPool().close(0)
        console.log("Pool Closed ")
    }catch(err){
        HandleUnexpectedError(err as Error,1)
    }
})

process.on("exit",(number)=>{
    console.log("The Process Terminated with code ",number)
})