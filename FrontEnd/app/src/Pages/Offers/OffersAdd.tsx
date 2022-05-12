import { Routes,Route, Navigate, useNavigate } from "react-router-dom"
import APIROUTES from "../../constants/ApiRoutes"
import OffersModAddModel from "./OffersModAddModel"
import OffersTableInfo from "../../components/ClientsTable/ClientsTableInfo"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
const AddComponent = ()=>{
    const {payload : submitResponseData,isLoading : isMutationLoading, isError: isMutationError,mutate} = useMutateQuery(APIROUTES.OFFERS.ADD,'POST',undefined,["offers-table-info"])

    return <div className="page">
    <section className="page-header">
        <div className="section-1">
            <h1>Add An Offer</h1>
        </div>            
    </section>
    
    <section className="page-body">
    <OffersModAddModel mutate={mutate}  />
    </section>
    <section className="page-footer">
    </section>
</div>
}

const ClientsAdd = ()=>{
    return <AddComponent />
}

export default ClientsAdd