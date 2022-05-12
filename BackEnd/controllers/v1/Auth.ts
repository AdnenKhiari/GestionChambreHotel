import express,{NextFunction, Response,Request} from "express"
import * as AuthModel from "../../models/Auth"
import bcrypt  from "bcrypt"
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
    return res.status(400).send("Not Authorised")
}


app.post("/signup",async (req,res,next)=>{
    try{
        const {email,password,fullname} = req.body
        const hashed_password = await bcrypt.hash(password,10)
        const logged_user = await AuthModel.CreateUser({email,password: hashed_password,fullname})
    
        if(logged_user){
          
           //add connection cookie 
          await addCookie(logged_user,res)
          req.user= logged_user
          return res.json({fullname: logged_user.fullname,id: logged_user.id})  
        }else{
            return res.status(400).send("Error in auth")
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
            return res.status(400).send("Bad Credentials")
        }
        await addCookie(user,res)
      //  console.log("USER",user)
        return res.json(user)
    }catch(err){
        return next(err)
    }

})

app.get("/logged",Authenticate,async (req,res,next)=>{
    return res.json(req.user)
})

const LoginUser = async (email : string,password: string ) =>{
    const user: any = await AuthModel.LoginUser(email);
    if(!user)
        return null;
    const match = await bcrypt.compare(password,user.password);
    if(match){
        return {id: user.id,fullname: user.fullname}
    }
    return null
}
const AuthenticateUser = async (req: Request,res: Response)=>{
    if(req.user)
        return;
    const ssid = req.cookies[ck_name]
    console.log("SSID: ",ssid)
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