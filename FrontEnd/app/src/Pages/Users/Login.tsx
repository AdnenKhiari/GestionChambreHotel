import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";
import { useMutateQuery } from "../../lib/Queries/useMutateQuery";
import APIROUTES from "../../constants/ApiRoutes"
import ROUTES from "../../constants/Routes"

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password")
})

const Login = ({userInfo,setUserInfo} : {userInfo:any,setUserInfo: any})=>{
    const {payload : udata,isLoading : isMutationLoading, isError: isMutationError,mutate} = useMutateQuery(APIROUTES.USERS.LOGIN,'POST',undefined,["get-connected-user"])
    const { register,handleSubmit, setValue,control, watch, reset , formState: { errors }} = useForm({
        shouldUnregister: true,
        resolver: joiResolver(schema)
    }); 
    const [loginError,setLoginError] = useState("")

    useEffect(()=>{
        setUserInfo(udata)
    },[udata])

    useEffect(()=>{
        if(isMutationError){
            setLoginError("Bad Email or password");
            setUserInfo(null)
        }
    },[isMutationError])


    if(userInfo){
        return <Navigate to={ROUTES.BOOKING.SHOW} />
    }

    return <div className="loginpage"><form onSubmit={handleSubmit((data)=>{
        mutate(data)
    })} 
    
    className="login-form">
        <h1>Login</h1>
        <div className="login-form-item">
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} />
            {errors && <p className="danger-text"> {errors["email"]?.message.replace('"','')}</p>}
        </div>
        <div className="login-form-item">
            <label htmlFor="password">Password</label>
            <input type="password" {...register("password")} />
            {errors && <p className="danger-text"> {errors["password"]?.message.replace('"','')}</p>}
        </div>

        <button type="submit">Login</button>
        <button type="submit">Reset</button>

        <p>{loginError}</p>
    </form>
    </div> 
}

export default Login