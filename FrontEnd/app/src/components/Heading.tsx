import APIROUTES from "../constants/ApiRoutes"
import { useNavigate } from "react-router-dom"
import { useMutateQuery } from "../lib/Queries/useMutateQuery"
const Heading = ({userInfo,setUserInfo} : {userInfo: any,setUserInfo: any})=>{
  const {isLoading,isError,payload,mutate} = useMutateQuery(APIROUTES.USERS.LOGOUT,"POST",(data: any)=>{
  setUserInfo(null)
  })
   const nav = useNavigate()
   return <header> 
    <div>
      <h1>Welcome ,{userInfo.fullname}</h1>
    </div>
    <div>
      <p onClick={(e)=>{
        mutate()
      }}>Logout</p>
    </div>
  </header>
}

export default Heading