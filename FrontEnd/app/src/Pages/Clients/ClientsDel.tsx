import ClientsTableInfo from "../../components/ClientsTable/ClientsTableInfo"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
import  ROUTES from "../../constants/ApiRoutes"
const ClientsDel = ()=>{
    const {mutate} = useMutateQuery(ROUTES.CLIENTS.DELETE,"DELETE",undefined,["client-table-info"])
    const red = (row : any[])=>{
        mutate({id: row[0]})
    }
    return <ClientsTableInfo  onRowClick={red} />
}
export default ClientsDel