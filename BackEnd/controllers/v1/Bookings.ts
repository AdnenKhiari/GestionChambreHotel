import express from "express"
import * as BookingsModel from "../../models/Bookings"
const app = express.Router()

app.get("/",(req,res)=>{
    return res.send("hi from Bookings")
})

app.get("/info",async (req,res,next)=>{
    try{
        const data = req.query
        const result  = await BookingsModel.GetBookingInfo(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.get("/:id",async (req,res,next)=>{
    try{
        const data = req.params
        const result = await BookingsModel.GetBookingById(data)
        return res.send(result)
    }catch(err){
        return next(err)
    }
})

app.post("/",async (req,res,next)=>{
    try{
        const data = req.body
        const result = await BookingsModel.AddBooking(data)
        return res.send("ok")
    }catch(err){
        return next(err)
    }
})

app.patch("/:id",async (req,res,next)=>{
    //the id is kinda uselss cause it's already in the booking id ( body) xD
    try{
        const data = req.body
        const result = await BookingsModel.ModBooking(data)
        return res.send("ok")
    }catch(err){
        return next(err)
    }
})

app.delete("/",async (req,res,next)=>{
    try{
        const data = req.body
        const result = await BookingsModel.RemoveBooking(data)
        return res.send("ok")
    }catch(err){
        return next(err)
    }
})

export default app