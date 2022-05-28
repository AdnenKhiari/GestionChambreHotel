import ClientsModAddModel from "./ClientsModAddModel"
import { Routes,Route, Navigate, useNavigate, useParams } from "react-router-dom"
import ClientsTableInfo from "../../components/ClientsTable/ClientsTableInfo"
import ROUTES from "../../constants/Routes"
import { useGetQuery } from "../../lib/Queries/useGetQuery"
import  APIROUTES from "../../constants/ApiRoutes"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
import { LoadingCercle } from "../../components/LoadingCercle"
import { FadeInScale, StaggerChildren } from "../../lib/Animations"
import { motion } from "framer-motion"

const ModComponent = ()=>{
    const  {id } = useParams()
    const {payload : udata,isLoading,isError,refetch} = useGetQuery(['get-client-by-id',id],APIROUTES.CLIENTS.GETBYID(id))
    const {payload : submitResponseData,isLoading : isMutationLoading, isError: isMutationError,mutate} = useMutateQuery(APIROUTES.CLIENTS.UPDATE(id),'PATCH',undefined,["client-table-info"])
    if(isError)
        return <h1 className="danger-color">Error !</h1>
    if(isLoading)
        return  <LoadingCercle/>
    return <motion.div className="page" variants={StaggerChildren(0.1,0)} initial="initial" exit="exit" animate="animate">
    <motion.div className="page-header" variants={FadeInScale}>
        <div className="section-1">
            <h1>Updating Client:<span>#{udata?.id}</span> </h1>
            <div className={"labelitem " + (udata?.here ? "success" : "danger") }>{udata?.here ? "IN" : "OUT"}</div>
        </div>            
        <div className="section-2">
            <p>Booking ID:<span>#2402</span> </p>
            <p>Room:<span>102</span></p>
        </div>
    </motion.div>
    <motion.div className="page-body" variants={FadeInScale}>
        <ClientsModAddModel mutate={mutate}  initData={udata} />
    </motion.div>
    <section className="page-footer">
    </section>
</motion.div>
}
const SearchComponent = ()=>{
    const navigate = useNavigate()
    const red = (row : any[])=>{
        navigate(ROUTES.CLIENTS.MOD+row[0])
    }
    return <ClientsTableInfo  onRowClick={red} />
}

const ClientsMod = ()=>{
    return <Routes>
        <Route path=":id" element={<ModComponent />} />
        <Route path="" element={<SearchComponent />} />
    </Routes>
}

export default ClientsMod