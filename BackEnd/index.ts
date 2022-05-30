import bodyParser from "body-parser"
import express,{Express,Request,Response} from "express"
import ApiControllers from "./controllers"
import cors from "cors"
import CookieParser from "cookie-parser"
import { ErrorHandler, HandleUnexpectedError } from "./Errors/ErrorHandler"
import oracledb from "oracledb"
import { InitialisePoolConnection } from "./lib/Db"

//start an app instance
const app : Express = express()

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

//ready to accept json data
app.use(bodyParser.json())

//use cookie parser
app.use(CookieParser())

if(process.env.NODE_ENV !== "production"){
    //cors for dev only because the react dev server needs to access the resource 
    app.use(cors({
        origin: process.env.REACT_APP_DEV_UI_URL,
        credentials: true
    }))
}


app.get("/",(req : Request,res : Response)=>{
    res.send("Hii")
})

app.use("/api",ApiControllers);

app.use(ErrorHandler)

const InitServer = async ()=>{
    try{
        //create db pool
        await InitialisePoolConnection()
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
        oracledb.getPool().close(0)
        console.log("Pool Closed ")
    }catch(err){
        HandleUnexpectedError(err as Error,1)
    }
})

process.on("exit",(number)=>{
    console.log("The Process Terminated with code ",number)
})