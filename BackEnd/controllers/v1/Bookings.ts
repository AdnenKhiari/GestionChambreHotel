import express from "express"
import * as BookingsModel from "../../models/Bookings"
import {IClientInfoOutput} from "../../lib/interfaces/Clients"
const app = express.Router()

app.get("/",(req,res)=>{
    return res.send("hi from Bookings")
})

app.get("/info",async (req,res,next)=>{
    try{
        const data = req.query
        console.log(data)
        const result : any = await BookingsModel.GetBookingInfo(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.get("/:id",async (req,res,next)=>{
    try{
        const data = req.params
        const result = await BookingsModel.GetBookingById(data)
        return res.json(result)
    }catch(err){
        console.log("Michit feha")
        return next(err)
    }
})

app.post("/",async (req,res,next)=>{
    try{
        const data = req.body
        const result = await BookingsModel.AddBooking(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.patch("/:id",async (req,res,next)=>{
    //the id is kinda uselss cause it's already in the booking id ( body) xD
    try{
        const data = req.body
        const result = await BookingsModel.ModBooking(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.delete("/",async (req,res,next)=>{
    try{
        const data = req.body
        console.log(data)
        const result: any = await BookingsModel.RemoveBooking(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})


/*

app.get("/:id/history",async (req,res,next)=>{
    try{
        const data = req.params
        const result : any[][] = await BookingsModel.GetBookingHistory(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})


*/
export default app