import { motion } from "framer-motion"
import { Routes,Route, Navigate, useNavigate } from "react-router-dom"
import APIROUTES from "../../constants/ApiRoutes"
import { FadeInScale, StaggerChildren } from "../../lib/Animations"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
import RoomsModAddModel from "./RoomsModAddModel"
const AddComponent = ()=>{
    const {payload : submitResponseData,isLoading : isMutationLoading, isError: isMutationError,mutate} = useMutateQuery(APIROUTES.ROOMS.ADD,'POST',undefined,["rooms-table-info"])

    return <motion.div className="page" variants={StaggerChildren(0.1,0)} initial="initial" exit="exit" animate="animate">
    <motion.div className="page-header" variants={FadeInScale}>
        <div className="section-1">
            <h1>Add A Room</h1>
        </div>            
    </motion.div>
    
    <motion.div className="page-body" variants={FadeInScale}>
        <RoomsModAddModel mutate={mutate}  />
    </motion.div>
    <section className="page-footer">
    </section>
</motion.div>
}

const RoomsAdd = ()=>{
    return <AddComponent />
}

export default RoomsAdd