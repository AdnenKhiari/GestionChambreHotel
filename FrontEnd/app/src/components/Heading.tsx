import APIROUTES from "../constants/ApiRoutes"
import { useNavigate } from "react-router-dom"
import { useMutateQuery } from "../lib/Queries/useMutateQuery"
import { IUseQuery } from "../types"
import { useContext } from "react"
import { UserContext } from "../lib/context"
import { FadeInScale } from "../lib/Animations"
import { motion } from "framer-motion"
const Heading : React.FC =  ()=>{
  const user = useContext(UserContext)
  
  const {isLoading,isError,payload,mutate}= useMutateQuery(APIROUTES.USERS.LOGOUT,"POST",(data: any)=>{
    user?.setUserInfo(null)
  })
   const nav = useNavigate()
   return <header> 
    <div>
      <motion.h1 variants={FadeInScale} animate="animate" initial="initial">Welcome ,{user?.userInfo.fullname}</motion.h1>
    </div>
    <div>
      <p id="lgout"  onClick={(e)=>{
        mutate()
      }}>Logout</p>
    </div>
  </header>
}

export default Heading