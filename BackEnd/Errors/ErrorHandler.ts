import { NextFunction ,Request,Response} from "express";
import { StatusCodes } from "http-status-codes";
import { exit } from "process";
import ApiError from "./ApiError";

export const ErrorHandler = (err: Error,req: Request,res: Response,next: NextFunction) => {
    if(err instanceof ApiError){
        return res.status(err.status_code).send(err.format_for_response())
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