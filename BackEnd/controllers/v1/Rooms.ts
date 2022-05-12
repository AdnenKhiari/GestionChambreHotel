import express from "express"
import * as RoomsModel from "../../models/Rooms"
const app = express.Router()

app.get("/",(req,res)=>{
    return res.send("hi from rooms")
})
app.get("/info",async (req,res,next)=>{
    try{
        const data = req.query
        console.log(data)
        const result : any[][] = await RoomsModel.GetRoomsInfo(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
app.get("/:id/history",async (req,res,next)=>{
    try{
        const data = req.params
        const result : any[][] = await RoomsModel.GetRoomsHistory(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
app.get("/:id",async (req,res,next)=>{
    try{
        const data = req.params
        const result : any[][] = await RoomsModel.GetRoomById(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.post("/",async (req,res,next)=>{
    try{
        const data = req.body
       // console.log(data)

        const result : any[][] = await RoomsModel.AddRoom(data)
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
        console.log(data)

        const result : any[][] = await RoomsModel.UpdateRoom(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.delete("/",async (req,res,next)=>{
    try{
        const data = req.body
        console.log(data)
        const result : boolean = await RoomsModel.RemoveRoom(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
export default app
