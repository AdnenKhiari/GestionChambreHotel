import APIROUTES from "../../constants/ApiRoutes"
import ClientsModAddModel from "./ClientsModAddModel"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
import { motion } from "framer-motion"
import { FadeInScale, StaggerChildren } from "../../lib/Animations"

const AddComponent = ()=>{
    const {payload : submitResponseData,isLoading : isMutationLoading, isError: isMutationError,mutate} = useMutateQuery(APIROUTES.CLIENTS.ADD,'POST',undefined,["client-table-info"])

    return <motion.div className="page" variants={StaggerChildren(0.1,0)} initial="initial" exit="exit" animate="animate">
    <motion.div className="page-header" variants={FadeInScale}>
        <div className="section-1">
            <h1>Add A Client</h1>
        </div>            
    </motion.div>
    
    <motion.div className="page-body" variants={FadeInScale}>
    <ClientsModAddModel mutate={mutate}  />
    </motion.div>
    <section className="page-footer">
    </section>
</motion.div>
}
const ClientsAdd = ()=>{
    return <AddComponent />
}

export default ClientsAdd