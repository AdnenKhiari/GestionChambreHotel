import bodyParser from "body-parser"
import express,{Express,Request,Response} from "express"
import {testConnection,Init} from "./lib/QueryExecutor"
import ApiControllers from "./controllers"
import cors from "cors"
import CookieParser from "cookie-parser"
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

//open pool connections to db
Init()

//Test db connection 
testConnection()

app.get("/",(req : Request,res : Response)=>{
    res.send("Hii")
})

app.use("/api",ApiControllers);

app.listen(process.env.SERVER_PORT,()=>{
    console.log("Working fine !")
    
})