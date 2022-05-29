import express from "express"
import * as RoomsModel from "../../models/Rooms"
const app = express.Router()
import * as RoomsValidation from "../../lib/ValidateInputs/Rooms"
app.get("/",(req,res)=>{
    return res.send("hi from rooms")
})
app.get("/info",RoomsValidation.ValidateGetInfo,async (req,res,next)=>{
    try{
        const data = req.data
        const result  = await RoomsModel.GetRoomsInfo(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.get("/:id",RoomsValidation.ValidateGetById,async (req,res,next)=>{
    try{
        const data = req.data
        const result  = await RoomsModel.GetRoomById(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.post("/",RoomsValidation.ValidateInsert,async (req,res,next)=>{
    try{
        const data = req.data
        const result = await RoomsModel.AddRoom(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.patch("/:id",RoomsValidation.ValidateUpdate,async (req,res,next)=>{
    try{
        const data = req.data
        const result = await RoomsModel.UpdateRoom(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.get("/:id/history",RoomsValidation.ValidateGetHistory,async (req,res,next)=>{
    try{
        const data = req.data
        const result  = await RoomsModel.GetRoomsHistory(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.delete("/",RoomsValidation.ValidateDelete,async (req,res,next)=>{
    try{
        const data = req.data
        const result = await RoomsModel.RemoveRoom(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
export default app
