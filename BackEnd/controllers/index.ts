import express from "express"
import v1Api from "./v1"

const app = express.Router()

app.use("/",v1Api)


export default app