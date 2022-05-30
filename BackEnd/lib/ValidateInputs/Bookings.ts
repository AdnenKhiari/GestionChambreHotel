import { NextFunction ,Request,Response} from 'express';
import Joi from "joi"
export const ValidateGetInfo = async ( req: Request,res: Response,next: NextFunction) => {
    const schema = Joi.object({
        id : Joi.number().allow("").optional().positive(),
        name: Joi.string().allow("").optional().label("Name"),
        date_checkin: Joi.date().allow("").optional().label("Check In"),
        date_checkout: Joi.date().allow("").optional().label("Check Out"),
        pagenum: Joi.number().min(0).default(0).optional().label("Page Number")
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
export const ValidateGetById = async ( req: Request,res: Response,next: NextFunction) => {
    const schema = Joi.object({
        id : Joi.number().required().positive(),
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
    const room_schema = Joi.object({
        ROOM_ID: Joi.number().required().label("Room"),
        OFFER_ID: Joi.number().required().label("Offer"),
        ALLOCATED_ROOM_ID: Joi.number().optional().default(-1),
        FOOD_CHOICE: Joi.valid('H','N','F','SI','AI').required().label("Food Choice"),
        CLIENTS_TO_ADD : Joi.array().label("Clients"),
        CLIENTS_TO_REMOVE : Joi.array().label("Clients")
    })
    const booking_data = Joi.object().keys({
        BOOKING_NAME: Joi.string().required().label("Booking Name"),
        BOOKING_ID: Joi.optional().label("Booking Id").default(-1),
        DATE_CHECKIN: Joi.date().required().label("Check In"),
        DATE_CHECKOUT: Joi.date().required().label("Check Out"),
        ROOMS: Joi.array().items(room_schema).label("Rooms")
    })
    const schema = Joi.object({
        BOOKING_DATA : booking_data,
        ROOMS_TO_REMOVE : Joi.array().label("Clients")
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

export const ValidateInsert = async ( req: Request,res: Response,next: NextFunction) => {
    const room_schema = Joi.object({
        ROOM_ID: Joi.number().required().label("Room"),
        OFFER_ID: Joi.number().required().label("Offer"),
        ALLOCATED_ROOM_ID: Joi.number().optional().default(-1),
        FOOD_CHOICE: Joi.valid('H','N','F','SI','AI').required().label("Food Choice"),
        CLIENTS_TO_ADD : Joi.array().label("Clients"),
        CLIENTS_TO_REMOVE : Joi.array().label("Clients")
    })
    const booking_data = Joi.object().keys({
        BOOKING_NAME: Joi.string().required().label("Booking Name"),
        BOOKING_ID: Joi.optional().label("Booking Id").default(-1),
        DATE_CHECKIN: Joi.date().required().label("Check In"),
        DATE_CHECKOUT: Joi.date().required().label("Check Out"),
        ROOMS: Joi.array().items(room_schema).label("Rooms")
    })
    const schema = Joi.object({
        BOOKING_DATA : booking_data,
        ROOMS_TO_REMOVE : Joi.array().label("Clients")
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
    const schema = Joi.object({
        id: Joi.number().positive().required().label("ID"),
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
