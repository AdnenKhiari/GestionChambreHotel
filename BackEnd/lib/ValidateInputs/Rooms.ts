import { NextFunction ,Request,Response} from 'express';
import joi from "joi"
export const ValidateGetInfo = async ( req: Request,res: Response,next: NextFunction) => {
    const schema = joi.object({
        id : joi.number().allow("").optional().positive(),
        room_number: joi.number().allow("").optional().label("Room Number"),
        capacity: joi.valid("S","D","T","Q","").optional().label("Room Capacity"),
        type: joi.valid("R","S","").optional().label("Room Type"),
        options: joi.valid("D","P","S","").optional().label("Room Options"),
        state: joi.valid("F","O","M","C","").optional().label("Room State"),
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
        bookingId : joi.number().allow("").positive().optional(),
        checkIn: joi.date().allow("").optional(),
        checkOut: joi.date().allow("").optional(),
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
        room_number: joi.number().required().label("Room Number"),
        capacity: joi.valid("S","D","T","Q").required().label("Room Capacity"),
        type: joi.valid("R","S").required().label("Room Type"),
        options: joi.valid("D","P","S").required().label("Room Options"),
        state: joi.valid("F","O","M","C").required().label("Room State"),
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
        room_number: joi.number().required().label("Room Number"),
        capacity: joi.valid("S","D","T","Q").required().label("Room Capacity"),
        type: joi.valid("R","S").required().label("Room Type"),
        options: joi.valid("D","P","S").required().label("Room Options"),
        state: joi.valid("F","O","M","C").required().label("Room State"),
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