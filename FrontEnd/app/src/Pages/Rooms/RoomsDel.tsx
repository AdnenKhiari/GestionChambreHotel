import RoomsTableInfo from "../../components/RoomsTable/RoomsTableInfo"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
import  ROUTES from "../../constants/ApiRoutes"
const RoomDel = ()=>{
    const {mutate} = useMutateQuery(ROUTES.ROOMS.DELETE,"DELETE",undefined,["room-table-info"])
    const red = (row : any[])=>{
        mutate({id: row[0]})
    }
    return <RoomsTableInfo  onRowClick={red} />
}
export default RoomDel