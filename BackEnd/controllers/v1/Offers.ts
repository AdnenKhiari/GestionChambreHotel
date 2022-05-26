import express from "express"
import * as OffersModel from "../../models/Offers"
const app = express.Router()

app.get("/",(req,res)=>{
    return res.send("hi from client")
})

app.get("/info",async (req,res,next)=>{
    try{
        const data = req.query
        const result  = await OffersModel.GetOffersInfo(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.get("/:id",async (req,res,next)=>{
    try{
        const data = req.params
        const result : Offer | undefined = await OffersModel.GetOfferById(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
app.get("/:id/history",async (req,res,next)=>{
    try{
        const data : any = req.query
        data.id = req.params.id
        console.log(data)
        const result  = await OffersModel.GetOffersHistory(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
app.post("/",async (req,res,next)=>{
    try{
        const data = req.body
        console.log(data)

        const result = await OffersModel.AddOffer(data)
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

        const result = await OffersModel.UpdateOffer(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.delete("/",async (req,res,next)=>{
    try{
        const data = req.body
        console.log(data)
        const result = await OffersModel.RemoveOffer(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
export default app
