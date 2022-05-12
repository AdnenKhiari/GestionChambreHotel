import bodyParser from "body-parser"
import express,{Express,Request,Response} from "express"
import {testConnection,Init} from "./lib/QueryExecutor"
import ApiControllers from "./controllers"
import cors from "cors"
//start an app instance
const app : Express = express()
require("dotenv").config()

//ready to accept json data
app.use(bodyParser.json())

//cors
app.use(cors())

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