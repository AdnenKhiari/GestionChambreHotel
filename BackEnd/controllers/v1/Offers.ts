import express from "express"
import * as OffersModel from "../../models/Offers"
import * as OffersValidation from "../../lib/ValidateInputs/Offers"

const app = express.Router()

app.get("/",(req,res)=>{
    return res.send("hi from client")
})

app.get("/info",OffersValidation.ValidateGetInfo,async (req,res,next)=>{
    try{
        const data = req.data
        const result  = await OffersModel.GetOffersInfo(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.get("/:id",OffersValidation.ValidateGetById,async (req,res,next)=>{
    try{
        const data = req.data
        const result : Offer | undefined = await OffersModel.GetOfferById(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
app.get("/:id/history",OffersValidation.ValidateGetHistory,async (req,res,next)=>{
    try{
        const data : any = req.data
        const result  = await OffersModel.GetOffersHistory(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
app.post("/",OffersValidation.ValidateInsert,async (req,res,next)=>{
    try{
        const data = req.body

        const result = await OffersModel.AddOffer(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})

app.patch("/:id",OffersValidation.ValidateUpdate,async (req,res,next)=>{
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

app.delete("/",OffersValidation.ValidateDelete,async (req,res,next)=>{
    try{
        const data = req.body
        const result = await OffersModel.RemoveOffer(data)
        return res.json(result)
    }catch(err){
        return next(err)
    }
})
export default app
