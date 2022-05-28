import APIROUTES from "../../constants/ApiRoutes"
import ClientsModAddModel from "./ClientsModAddModel"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"

const AddComponent = ()=>{
    const {payload : submitResponseData,isLoading : isMutationLoading, isError: isMutationError,mutate} = useMutateQuery(APIROUTES.CLIENTS.ADD,'POST',undefined,["client-table-info"])

    return <div className="page">
    <section className="page-header">
        <div className="section-1">
            <h1>Add A Client</h1>
        </div>            
    </section>
    
    <section className="page-body">
    <ClientsModAddModel mutate={mutate}  />
    </section>
    <section className="page-footer">
    </section>
</div>
}
const ClientsAdd = ()=>{
    return <AddComponent />
}

export default ClientsAdd