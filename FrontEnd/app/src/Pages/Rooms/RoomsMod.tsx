import RoomsModAddModel from "./RoomsModAddModel"
import { Routes,Route, Navigate, useNavigate, useParams } from "react-router-dom"
import ROUTES from "../../constants/Routes"
import { useGetQuery } from "../../lib/Queries/useGetQuery"
import  APIROUTES from "../../constants/ApiRoutes"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
import { getRoomCapacity ,getRoomState} from "../../lib/Utils"
import RoomsTableInfo from "../../components/RoomsTable/RoomsTableInfo"
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
    
    const {payload : rdata,isLoading,isError,refetch} = useGetQuery(['get-room-by-id',id],APIROUTES.ROOMS.GETBYID(id))
    const {payload : submitResponseData,isLoading : isMutationLoading, isError: isMutationError,mutate} = useMutateQuery(APIROUTES.ROOMS.UPDATE(id),'PATCH',undefined,["rooms-table-info"])
   
    if(isError)
        return <h1 className="danger-color">Error !</h1>
    if(isLoading)
        return <p className="warning-color">Loading !</p>

    return <div className="page">
        <section className="page-header">
            <div className="section-1">
                <h1> Room:<span>#{rdata.id}</span> </h1>
                {<div className={"labelitem " + (rdata.state === 'F' ? "success" : "danger") }>{getRoomState(rdata.state)}</div>}
            </div>            
            <div className="section-2">
                <p>Room Capacity:<span>{getRoomCapacity(rdata.capacity)}</span></p>
                <p>Room Number:<span>{rdata.room_number}</span></p>
            </div>
        </section>
        <section className="page-body">
            <RoomsModAddModel mutate={mutate}  initData={rdata} />
        </section>
        <section className="page-footer">
            
        </section>
    </div>
}
const SearchComponent = ()=>{
    const navigate = useNavigate()
    const red = (row : any[])=>{
        navigate(ROUTES.ROOMS.MOD+row[0])
    }
    return <RoomsTableInfo  onRowClick={red} />
}

const RoomsMod = ()=>{
    return <Routes>
        <Route path=":id" element={<ModComponent />} />
        <Route path="" element={<SearchComponent />} />
    </Routes>
    //fetch with that id use location
   
}

export default RoomsMod