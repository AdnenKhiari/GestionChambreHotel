import APIROUTES from "../constants/ApiRoutes"
import { useNavigate } from "react-router-dom"
import { useMutateQuery } from "../lib/Queries/useMutateQuery"
import { IUseQuery } from "../types"
import { useContext } from "react"
import { UserContext } from "../lib/context"
const Heading : React.FC =  ()=>{
  const user = useContext(UserContext)
  
  const {isLoading,isError,payload,mutate}= useMutateQuery(APIROUTES.USERS.LOGOUT,"POST",(data: any)=>{
    user?.setUserInfo(null)
  })
   const nav = useNavigate()
   return <header> 
    <div>
      <h1>Welcome ,{user?.userInfo.fullname}</h1>
    </div>
    <div>
      <p id="lgout"  onClick={(e)=>{
        mutate()
      }}>Logout</p>
    </div>
  </header>
}

export default Heading