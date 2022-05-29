import { NextFunction ,Request,Response} from 'express';
import joi from "joi"
export const ValidateGetInfo = async ( req: Request,res: Response,next: NextFunction) => {
    const schema = joi.object({
        id : joi.number().allow("").optional().positive(),
        date_start: joi.date().allow("").optional().label("Start Date"),
        date_end: joi.date().allow("").empty("null").default(null).optional().label("End Date"),
        price : joi.number().positive().allow("").optional().label("Price"),
        name : joi.string().allow("").optional().label("Name"),
        pagenum: joi.number().min(0).default(0).optional().label("Page Number")
    })
    try{
        const data = req.query
        const result = await schema.validateAsync(data,{abortEarly: false})
        req.data = result
        return next()
    }catch(err){
        return next(err)
    }
}
export const ValidateGetHistory = async ( req: Request,res: Response,next: NextFunction) => {
    const schema = joi.object({
        id : joi.number().allow("").required().positive(),
        pagenum: joi.number().min(0).default(0).optional().label("Page Number"),
        bookingId : joi.number().allow("").positive().optional().label("Booking ID"),
        room_number : joi.number().allow("").positive().optional().label("Room Number"),
        checkIn: joi.date().allow("").optional().label("Checkin"),
        checkOut: joi.date().allow("").optional().label("Checkout"),
    })
    try{
        const data = req.query
        data.id = req.params.id
        const result = await schema.validateAsync(data,{abortEarly: false})
        req.data = result
        return next()
    }catch(err){
        return next(err)
    }
}
export const ValidateGetById = async ( req: Request,res: Response,next: NextFunction) => {
    const schema = joi.object({
        id : joi.number().required().positive(),
    })
    try{
        const data = req.params
        const result = await schema.validateAsync(data,{abortEarly: false})
        req.data = result
        return next()
    }catch(err){
        return next(err)
    }
}

export const ValidateUpdate = async ( req: Request,res: Response,next: NextFunction) => {
    const schema = joi.object({
        id: joi.number().positive().required().label("ID"),
        date_start: joi.date().required().label("Start Date"),
        date_end: joi.date().allow("",null).empty("").empty("null").default(null).optional().label("End Date"),
        price : joi.number().positive().required().label("Price"),
        name : joi.string().required().label("Name"),
        description : joi.string().required().label("Description")
    })
    try{
        const data = req.body
        const {id} = req.params
        data["id"] = id
        const result = await schema.validateAsync(data,{abortEarly: false})
        req.data = result
        return next()
    }catch(err){
        return next(err)
    }
}

export const ValidateInsert = async ( req: Request,res: Response,next: NextFunction) => {
    const schema = joi.object({
        date_start: joi.date().required().label("Start Date"),
        date_end: joi.date().allow("",null).empty("").empty("null").default(null).optional().label("End Date"),
        price : joi.number().positive().required().label("Price"),
        name : joi.string().required().label("Name"),
        description : joi.string().required().label("Description")
    })
    try{
        const data = req.body
        const result = await schema.validateAsync(data,{abortEarly: false})
        req.data = result
        return next()
    }catch(err){
        return next(err)
    }
}

export const ValidateDelete = async ( req: Request,res: Response,next: NextFunction) => {
    const schema = joi.object({
        id: joi.number().positive().required().label("ID"),
    })
    try{
        const data = req.body
        const result = await schema.validateAsync(data,{abortEarly: false})
        req.data = result
        return next()
    }catch(err){
        return next(err)
    }
}