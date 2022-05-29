import {IUniversalTable} from "../../types"
import joi from "joi"
import APIROUTES from "../../constants/ApiRoutes"
import { useNavigate, useParams } from "react-router-dom"
import Routes from "../../constants/Routes"
import UniversalTable from "../UniversalTable"

const searchInputs  : IUniversalTable.IsearchData[] = [
    {
        name: "bookingId",
        type: "number",
        label: "Booking ID"
    },
    {
        name: "room_number",
        type: "number",
        label: "Room Number"
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
    header:["Booking ID","Room Number","Check In","Check Out"],
    body: body
})
const schema = joi.object({
    pagenum: joi.number().min(0).default(0).optional().label("Page Number"),
    bookingId : joi.number().allow("").positive().optional().label("Booking ID"),
    room_number : joi.number().allow("").positive().optional().label("Room Number"),
    checkIn: joi.date().allow("").optional().label("Checkin"),
    checkOut: joi.date().allow("").optional().label("Checkout"),
})

const OffersTableHistory = ()=>{
    const {id} = useParams()
    const nav = useNavigate()
    return <UniversalTable queryname="offers-table-history" datatable={datatable} querypath={APIROUTES.OFFERS.HISTORY(id)} title="History" onRowClick = {(dt: any[])=> nav(Routes.BOOKING.SHOW + dt[0])}  searchData={searchInputs} schema={schema} paginate={true} />
}

export default OffersTableHistory