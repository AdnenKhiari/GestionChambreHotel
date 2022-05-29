import { NextFunction ,Request,Response} from 'express';
import joi from "joi"
export const ValidateGetInfo = async ( req: Request,res: Response,next: NextFunction) => {
    const schema = joi.object({
        id : joi.number().allow("").optional().positive(),
        fullname: joi.string().allow("").optional().label("Full Name"),
        date_of_birth: joi.date().allow("").optional().label("Birth Date"),
        cin: joi.string().allow("").optional().label("CIN"),
        gender: joi.valid("F","M","").optional().label("Gender"),
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
        bookingId : joi.number().allow("").positive().optional().label("Booking Id"),
        roomId : joi.number().allow("").positive().optional().label("Room Id"),
        checkIn: joi.date().allow("").optional().label("Check In"),
        checkOut: joi.date().allow("").optional().label("Check Out"),
        gender: joi.optional().label("Gender")
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
        fullname: joi.string().required().label("Full Name"),
        address: joi.string().required().label("Address"),
        date_of_birth: joi.date().required().label("Birth Date"),
        cin: joi.string().required().label("CIN"),
        job: joi.string().allow("",null).empty("").empty("null").optional().default(null).label("Job"),
        gender: joi.valid("F","M").required().label("Gender"),
        state: joi.valid("S","D","M").required().label("State"),
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
        fullname: joi.string().required().label("Full Name"),
        address: joi.string().required().label("Address"),
        date_of_birth: joi.date().required().label("Birth Date"),
        cin: joi.string().required().label("CIN"),
        job: joi.string().allow("",null).empty("").empty("null").optional().default(null).label("Job"),
        gender: joi.valid("F","M").required().label("Gender"),
        state: joi.valid("S","D","M").required().label("State"),
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