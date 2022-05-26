import express,{NextFunction, Response,Request} from "express"
import * as AuthModel from "../../models/Auth"
import bcrypt  from "bcrypt"
import ApiError from "../../Errors/ApiError"
import { StatusCodes } from "http-status-codes"
const app = express.Router()

const ck_name = 'gh-sid-connect'
let cookie_options = {
    maxAge: 60 * 60 * 10000, 
    httpOnly: true, 
    signed: false,
    secure: false 
}
const addCookie = async (userdata: any,res: Response)=>{
    const ssid_to_hash = userdata.email + process.env.SECRET + (new Date()).toISOString()
    const ssid = await bcrypt.hash(ssid_to_hash,5)
    await AuthModel.AddSSID(ssid, userdata.id)
    res.cookie(ck_name,ssid,cookie_options)
}
export const Authenticate = async (req: Request,res: Response,next: NextFunction)=>{

    await AuthenticateUser(req,res);
    if(req.user)
        return next()
    return next(new ApiError("You need to login to access the requested resource",null,StatusCodes.UNAUTHORIZED))
}


app.post("/signup",async (req,res,next)=>{
    try{
        const {email,password,fullname} = req.body
        const hashed_password = await bcrypt.hash(password,10)
        const logged_user = await AuthModel.CreateUser({email,password: hashed_password,fullname})
    
        if(logged_user){
          await addCookie(logged_user,res)
          req.user= logged_user
          return res.json({fullname: logged_user.fullname,id: logged_user.id})  
        }else{
            return next(new Error("User could not be created"))
        }
    }catch(err){
        return next(err)
    }
})

app.post("/login",async (req,res,next)=>{
    const data = req.body
    try{
        await AuthenticateUser(req,res)
        if(req.user)
            return res.json(req.user)
        const email: string = data.email
        const user: any = await LoginUser(email,data.password);
        if(!user){
            return next(new ApiError("Bad Credentials",null,StatusCodes.BAD_REQUEST))
        }
        await addCookie(user,res)
        return res.json(user)
    }catch(err){
        return next(err)
    }

})

app.post("/logout",async (req,res,next)=>{
    req.user = null;
    res.clearCookie(ck_name)
    res.send("Ok")
})
app.get("/logged",Authenticate,async (req,res,next)=>{
    return res.json(req.user)
})

const LoginUser = async (email : string,password: string ) =>{
    const user: User | null = await AuthModel.LoginUser(email);
    if(!user)
        return null;
    const match = await bcrypt.compare(password,user.password as string);
    if(match){
        return {id: user.id,fullname: user.fullname}
    }
    return null
}
const AuthenticateUser = async (req: Request,res: Response)=>{
    if(req.user)
        return;
    const ssid = req.cookies[ck_name]
    if(ssid){
        const user = await AuthModel.GetUserBySSID(ssid)
        req.user = user
        if(!user){
            res.clearCookie(ck_name)
        }
    }else{
        req.user = null
    }
}

export default app