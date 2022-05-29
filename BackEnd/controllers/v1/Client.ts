import express from "express"
import * as ClientsModel from "../../models/Clients"
import * as ClientsValidation from "../../lib/ValidateInputs/Clients"
const app = express.Router()

app.get("/",(req,res)=>{
    return res.send("hi from client")
})

app.get("/info",ClientsValidation.ValidateGetInfo,async (req,res,next)=>{
    try{
        const data = req.data
        const result = await ClientsModel.GetClientInfo(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.get("/:id",ClientsValidation.ValidateGetById,async (req,res,next)=>{
    try{
        const data = req.data
        const result = await ClientsModel.GetClientById(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
app.get("/:id/history",ClientsValidation.ValidateGetHistory,async (req,res,next)=>{
    try{
        const data : any = req.data
        const result = await ClientsModel.GetClientHistory(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.post("/",ClientsValidation.ValidateInsert,async (req,res,next)=>{
    try{
        const data = req.data
        const result = await ClientsModel.AddClient(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.patch("/:id",ClientsValidation.ValidateUpdate,async (req,res,next)=>{
    try{
        
        const data = req.data
        const result = await ClientsModel.UpdateClient(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.delete("/",ClientsValidation.ValidateDelete,async (req,res,next)=>{
    try{
        const data = req.data
        const result = await ClientsModel.RemoveClient(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
export default app