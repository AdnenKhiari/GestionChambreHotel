import { Routes,Route, Navigate, useNavigate } from "react-router-dom"
import APIROUTES from "../../constants/ApiRoutes"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
import RoomsModAddModel from "./RoomsModAddModel"
const AddComponent = ()=>{
    const {payload : submitResponseData,isLoading : isMutationLoading, isError: isMutationError,mutate} = useMutateQuery(APIROUTES.ROOMS.ADD,'POST',undefined,["rooms-table-info"])

    return <div className="page">
    <section className="page-header">
        <div className="section-1">
            <h1>Add A Room</h1>
        </div>            
    </section>
    
    <section className="page-body">
        <RoomsModAddModel mutate={mutate}  />
    </section>
    <section className="page-footer">
    </section>
</div>
}

const RoomsAdd = ()=>{
    return <AddComponent />
}

export default RoomsAdd