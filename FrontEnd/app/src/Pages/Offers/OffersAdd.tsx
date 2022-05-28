import { Routes,Route, Navigate, useNavigate } from "react-router-dom"
import APIROUTES from "../../constants/ApiRoutes"
import OffersModAddModel from "./OffersModAddModel"
import OffersTableInfo from "../../components/ClientsTable/ClientsTableInfo"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
import { FadeInScale, StaggerChildren } from "../../lib/Animations"
import { motion } from "framer-motion"
const AddComponent = ()=>{
    const {payload : submitResponseData,isLoading : isMutationLoading, isError: isMutationError,mutate} = useMutateQuery(APIROUTES.OFFERS.ADD,'POST',undefined,["offers-table-info"])

    return   <motion.div className="page" variants={StaggerChildren(0.1,0)} initial="initial" exit="exit" animate="animate">

    <motion.div  className="page-header" variants={FadeInScale}>
        <div className="section-1">
            <h1>Add An Offer</h1>
        </div>            
    </motion.div >
    
    <motion.div  className="page-body" variants={FadeInScale}>
    <OffersModAddModel mutate={mutate}  />
    </motion.div >
    <section className="page-footer">
    </section>
</motion.div >
}

const ClientsAdd = ()=>{
    return <AddComponent />
}

export default ClientsAdd