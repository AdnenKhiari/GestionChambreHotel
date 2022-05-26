import { NextFunction ,Request,Response} from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError";

export const ErrorHandler = (err: Error,req: Request,res: Response,next: NextFunction) => {
    if(err instanceof ApiError){
        return res.status(err.status_code).send(err.format_for_response())
    }else{
        console.log(err)
        //handle err here
        const internal_server_error = new ApiError("Internal Server Error",null,StatusCodes.INTERNAL_SERVER_ERROR)
        return res.status(internal_server_error.status_code).send(internal_server_error.format_for_response())
    }
}