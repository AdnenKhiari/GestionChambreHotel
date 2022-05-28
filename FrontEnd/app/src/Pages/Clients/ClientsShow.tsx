import ClientsTableHistory from "../../components/ClientsTable/ClientsTableHistory"
import { Routes,Route, Navigate, useNavigate, useParams } from "react-router-dom"
import ClientsTableInfo from "../../components/ClientsTable/ClientsTableInfo"
import ROUTES from "../../constants/Routes"
import { useGetQuery } from "../../lib/Queries/useGetQuery"
import APIROUTES from "../../constants/ApiRoutes"
import { clientsData } from "../../types"
import { LoadingCercle } from "../../components/LoadingCercle"
import { motion } from "framer-motion"
import { Slide, StaggerChildren } from "../../lib/Animations"
const ClientsShow = ()=>{
    return <Routes>
        <Route path=":id" element={<ShowComponent />} />
        <Route path="" element={<SearchComponent />} />
    </Routes>
}

const SearchComponent = ()=>{
    const navigate = useNavigate()
    const red = (row : any[])=>{
        navigate(ROUTES.CLIENTS.SHOW+row[0])
    }
    return <ClientsTableInfo  onRowClick={red} />
}

const ShowComponent = ()=>{

    const  {id } = useParams()
    const {payload : udata,isLoading,isError,refetch} = useGetQuery(['get-client-by-id',id],APIROUTES.CLIENTS.GETBYID(id))
    if(isError)
        return <h1 className="danger-color">Error !</h1>
    if(isLoading)
        return  <LoadingCercle/>


return  <motion.div className="page" variants={StaggerChildren(0.3,0)} initial="initial" exit="exit" animate="animate">
        <motion.div  className="page-header" variants={Slide}>
            <div className="section-1">
                <h1> Client:<span>#{udata.id}</span> </h1>
                <div className={"labelitem " + (udata.here ? "success" : "danger") }>{udata.here ? "IN" : "OUT"}</div>
            </div>            
            <div className="section-2" >
                <p>Booking ID:<span>#2402</span>  </p>
                <p>Room:<span>102</span></p>
            </div>
        </motion.div >
        <motion.div  className="page-body" variants={Slide}>
            <ClientInfo userData={udata}/>
            <ClientsTableHistory/>
        </motion.div >
        <section className="page-footer">
            
        </section>
    </motion.div>
}
const ClientInfo : React.FC<{userData : clientsData}>= ({userData})=>{
    return <div className="info-box">
        <p className="info-box-title">MetaData: </p>
        <div className="info-box-data">
            <p className="info-box-data-item"><span>Full Name:</span>{userData.fullname}</p>
            <p className="info-box-data-item"><span>CIN:</span>{userData.cin}</p>
            <p className="info-box-data-item"><span>Address:</span>{userData.address}</p>
            <p className="info-box-data-item"><span>Date of birth:</span>{userData.date_of_birth}</p>
            {userData.job && <p className="info-box-data-item"><span>Job:</span>{userData.job}</p>}
            <p className="info-box-data-item"><span>Gender:</span>{userData.gender=== "M" ? "Male" : "Female"}</p>
            <p className="info-box-data-item"><span>State:</span>{userData.gender=== "D" ? "Divorced" : userData.gender=== "S" ? "Single" : "Married"}</p>
        </div>
    </div>
}
export default ClientsShow