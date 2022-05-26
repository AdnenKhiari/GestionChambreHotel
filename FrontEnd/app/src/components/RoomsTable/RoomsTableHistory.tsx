import UniversalTable from "../UniversalTable"
import {IsearchData,ItableData} from "../UniversalTable/TableSchema"
import joi from "joi"
import React from "react"
import APIROUTES from "../../constants/ApiRoutes"
import { useNavigate, useParams } from "react-router-dom"
import Routes from "../../constants/Routes"

const searchInputs  : IsearchData[] = [
    {
        name: "bookingId",
        type: "number",
        label: "Booking ID"
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

const datatable  = (body: any) : ItableData => ({
    header:["Booking ID","Check In","Check Out"],
    body: body
})
const schema = joi.object({
    pagenum: joi.number().min(0).default(0).optional().label("Page Number"),
    bookingId : joi.number().allow("").positive().optional(),
    checkIn: joi.date().allow("").optional(),
    checkOut: joi.date().allow("").optional(),
})

const RoomsTableHistory = ()=>{
    const {id} = useParams()
    const nav = useNavigate()
    return <> 
        <UniversalTable queryname="rooms-table-history" datatable={datatable} querypath={APIROUTES.ROOMS.HISTORY(id)} title="History" onRowClick = {(dt: any[])=> nav(Routes.BOOKING.SHOW + dt[0])}  searchData={searchInputs} schema={schema} paginate={true} />
    </>
}

export default RoomsTableHistory