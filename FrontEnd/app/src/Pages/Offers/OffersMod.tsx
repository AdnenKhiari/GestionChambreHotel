import OffersModAddModel from "./OffersModAddModel"
import { Routes,Route, Navigate, useNavigate, useParams } from "react-router-dom"
import OffersTableInfo from "../../components/Offers Table/OffersTableInfo"
import ROUTES from "../../constants/Routes"
import { useGetQuery } from "../../lib/Queries/useGetQuery"
import  APIROUTES from "../../constants/ApiRoutes"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
import { LoadingCercle } from "../../components/LoadingCercle"
import { motion } from "framer-motion"
import { FadeInScale,  StaggerChildren } from "../../lib/Animations"
/*const udata : userData = {
    id: 1014,
    here: true,
    fullname:"Adnen Khiari",
    cin: "12345+9",
    address: "1 rue ibn jazzar manoba",
    date_of_birth: "05-12-2001",
    state: "S",
    gender: "M"
}*/
const ModComponent = ()=>{
    const  {id } = useParams()
    const {payload : odata,isLoading,isError,refetch} = useGetQuery(['get-offers-by-id',id],APIROUTES.OFFERS.GETBYID(id))
    const {payload : submitResponseData,isLoading : isMutationLoading, isError: isMutationError,mutate} = useMutateQuery(APIROUTES.OFFERS.UPDATE(id),'PATCH',undefined,["offers-table-info",['get-offers-by-id',id]])
    if(isError)
        return <h1 className="danger-color">Error !</h1>
    if(isLoading)
        return  <LoadingCercle/>
    return <motion.div className="page" variants={StaggerChildren(0.1,0)} initial="initial" exit="exit" animate="animate">
    <motion.div className="page-header" variants={FadeInScale}>
    <div className="section-1">
        <h1>Updating Offer:<span>#{odata.id}</span> </h1>
        <div className={"labelitem " + (new Date(odata.date_end) <= new Date() ? "success" : "danger") }>{odata.here ? "Active" : "Inactive"}</div>
    </div>            
    <div className="section-2">
        <p>Price :<span>{odata.price}</span> </p>
    </div>
    </motion.div>
    <motion.div className="page-body" variants={FadeInScale}>
        <OffersModAddModel mutate={mutate} initData={odata} />
    </motion.div>
    <section className="page-footer">
    </section>
</motion.div>
}
const SearchComponent = ()=>{
    const navigate = useNavigate()
    const red = (row : any[])=>{
        navigate(ROUTES.OFFERS.MOD+row[0])
    }
    return <OffersTableInfo  onRowClick={red} />
}

const OffersMod = ()=>{
    return <Routes>
        <Route path=":id" element={<ModComponent />} />
        <Route path="" element={<SearchComponent />} />
    </Routes>
    //fetch with that id use location
   
}

export default OffersMod