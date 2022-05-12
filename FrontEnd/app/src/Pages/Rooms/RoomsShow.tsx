import roomData from "./RoomsInterfaces"
import RoomsTableHistory from "../../components/RoomsTable/RoomsTableHistory"
import { Routes,Route, Navigate, useNavigate, useParams } from "react-router-dom"
import RoomsTableInfo from "../../components/RoomsTable/RoomsTableInfo"
import ROUTES from "../../constants/Routes"
import { useGetQuery } from "../../lib/Queries/useGetQuery"
import APIROUTES from "../../constants/ApiRoutes"
import { getRoomCapacity, getRoomOptions, getRoomState, getRoomType } from "../../lib/Utils"
const RoomsShow = ()=>{
    return <Routes>
        <Route path=":id" element={<ShowComponent />} />
        <Route path="" element={<SearchComponent />} />
    </Routes>
}

const SearchComponent = ()=>{
    const navigate = useNavigate()
    const red = (row : any[])=>{
        navigate(ROUTES.ROOMS.SHOW+row[0])
    }
    return <RoomsTableInfo  onRowClick={red} />
}

const ShowComponent = ()=>{

    const  {id } = useParams()
    const {payload : rdata,isLoading,isError,refetch} = useGetQuery(['get-room-by-id',id],APIROUTES.ROOMS.GETBYID(id))
   
    if(isError)
        return <h1 className="danger-color">Error !</h1>
    if(isLoading)
        return <p className="warning-color">Loading !</p>
    else
        console.log(rdata)

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
            <RoomsInfo data={rdata}/>
            <RoomsTableHistory />
        </section>
        <section className="page-footer">
            
        </section>
    </div>
}
const RoomsInfo = ({data} : {data : roomData})=>{
    return <div className="info-box">
        <p className="info-box-title">MetaData: </p>
        <div className="info-box-data">
            <p className="info-box-data-item"><span>Room Number:</span>{data.room_number}</p>
            <p className="info-box-data-item"><span>Room Capacity:</span>{getRoomCapacity(data.capacity)}</p>
            <p className="info-box-data-item"><span>Room type:</span>{getRoomType(data.type)}</p>
            <p className="info-box-data-item"><span>Room Options:</span>{getRoomOptions(data.options)}</p>
            <p className="info-box-data-item"><span>Room State:</span>{getRoomState(data.state)}</p>
        </div>
    </div>
}
export default RoomsShow