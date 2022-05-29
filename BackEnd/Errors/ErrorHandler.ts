import { NextFunction ,Request,Response} from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError";
import {ValidationError} from "joi"
export const ErrorHandler = (err: Error,req: Request,res: Response,next: NextFunction) => {
    if(err instanceof ApiError){
        return res.status(err.status_code).send(err.format_for_response())
    }if(err instanceof ValidationError ){
        return res.status(StatusCodes.BAD_REQUEST).send({name: err.name,description: err.name,payload: err.details.map(item => item.message)})
    }else{
        HandleUnexpectedError(err)
        const internal_server_error = new ApiError("Internal Server Error",null,StatusCodes.INTERNAL_SERVER_ERROR)
        return res.status(internal_server_error.status_code).send(internal_server_error.format_for_response())
    }
}

export const HandleUnexpectedError = (err: Error,level : number = 0)=>{
    console.log("Unexpected Error happened",err.stack)
    if(level != 0){
        process.exitCode = level 
    }
}