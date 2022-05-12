const Heading = ({userInfo,setUserInfo} : {userInfo: any,setUserInfo: any})=>{
   return <header> 
    <div>
      <h1>Welcome ,{userInfo.fullname}</h1>
    </div>
    <div>
      <p onClick={(e)=>{
        
      }}>Logout</p>
    </div>
  </header>
}

export default Heading