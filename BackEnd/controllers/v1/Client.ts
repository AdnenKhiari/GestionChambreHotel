import express from "express"
import * as ClientsModel from "../../models/Clients"
const app = express.Router()

app.get("/",(req,res)=>{
    return res.send("hi from client")
})

app.get("/info",async (req,res,next)=>{
    try{
        const data = req.query
        console.log(data)
        const result = await ClientsModel.GetClientInfo(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.get("/:id",async (req,res,next)=>{
    try{
        const data = req.params
        const result = await ClientsModel.GetClientById(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
app.get("/:id/history",async (req,res,next)=>{
    try{
        const data = req.query
        data.id = req.params.id
        const result = await ClientsModel.GetClientHistory(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.post("/",async (req,res,next)=>{
    try{
        const data = req.body
        console.log(data)

        const result = await ClientsModel.AddClient(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.patch("/:id",async (req,res,next)=>{
    try{
        
        const {id} = req.params
        const data = req.body
        data["id"] = id

        const result = await ClientsModel.UpdateClient(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.delete("/",async (req,res,next)=>{
    try{
        const data = req.body
        console.log(data)
        const result = await ClientsModel.RemoveClient(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
export default app