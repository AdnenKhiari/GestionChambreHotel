import express from "express"
import * as BookingsModel from "../../models/Bookings"
import * as BookingsValidation from "../../lib/ValidateInputs/Bookings"

const app = express.Router()

app.get("/",(req,res)=>{
    return res.send("hi from Bookings")
})

app.get("/info",BookingsValidation.ValidateGetInfo,async (req,res,next)=>{
    try{
        const data = req.data
        const result  = await BookingsModel.GetBookingInfo(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.get("/:id",BookingsValidation.ValidateGetById,async (req,res,next)=>{
    try{
        const data : any= req.data
        const result = await BookingsModel.GetBookingById(data)
        return res.send(result)
    }catch(err){
        return next(err)
    }
})

app.post("/",BookingsValidation.ValidateInsert,async (req,res,next)=>{
    try{
        const data = req.data
        const result = await BookingsModel.AddBooking(data)
        return res.send("ok")
    }catch(err){
        return next(err)
    }
})

app.patch("/:id",BookingsValidation.ValidateUpdate,async (req,res,next)=>{
    //the id is kinda uselss cause it's already in the booking id ( body) xD
    try{
        const data = req.data
        const result = await BookingsModel.ModBooking(data)
        return res.send("ok")
    }catch(err){
        return next(err)
    }
})

app.delete("/",BookingsValidation.ValidateDelete,async (req,res,next)=>{
    try{
        const data = req.data
        const result = await BookingsModel.RemoveBooking(data)
        return res.send("ok")
    }catch(err){
        return next(err)
    }
})

export default app