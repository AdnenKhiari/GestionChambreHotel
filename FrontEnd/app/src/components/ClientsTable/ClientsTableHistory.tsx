import UniversalTable from "../UniversalTable"
import joi from "joi"
import APIROUTES from "../../constants/ApiRoutes"
import { useNavigate, useParams } from "react-router-dom"
import Routes from "../../constants/Routes"
import { IUniversalTable } from "../../types"

const searchInputs  : IUniversalTable.IsearchData[] = [
    {
        name: "bookingId",
        type: "number",
        label: "Booking ID"
    },
    {
        name: "roomId",
        type: "number",
        label: "Room ID"
    },
    {
        name: "checkIn",
        type: "date",
        label: "Check In"
    },
    {
        name: "checkOut",
        type: "date",
        label: "Check Out"
    }
]

const datatable  = (body: any) : IUniversalTable.ItableData => ({
    header:["Booking ID","Room ID","Check In","Check Out"],
    body: body
})
const schema = joi.object({
    pagenum: joi.number().min(0).default(0).optional().label("Page Number"),
    bookingId : joi.number().allow("").positive().optional().label("Booking Id"),
    roomId : joi.number().allow("").positive().optional().label("Room Id"),
    checkIn: joi.date().allow("").optional().label("Check In"),
    checkOut: joi.date().allow("").optional().label("Check Out"),
    gender: joi.optional().valid("M","F","").label("Gender")
})

const ClientsTableHistory = ()=>{
    const {id} = useParams()
    const nav = useNavigate()
    return   <UniversalTable queryname="client-table-history" datatable={datatable} querypath={APIROUTES.CLIENTS.HISTORY(id)} title="History" onRowClick = {(dt: any[])=> nav(Routes.BOOKING.SHOW + dt[0])}  searchData={searchInputs} schema={schema} paginate={true} />
}

export default ClientsTableHistory