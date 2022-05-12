import UniversalTable from "../UniversalTable"
import {IsearchData,ItableData} from "../UniversalTable/TableSchema"
import joi from "joi"
import React from "react"
import APIROUTES from "../../constants/ApiRoutes"
import { useParams } from "react-router-dom"

const searchInputs  : IsearchData[] = [
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
        name: "client_name",
        type: "text",
        label: "Client Name"
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
    header:["Booking ID","Room Number","Check In","Check Out"],
    body: body
})
const schema = joi.object({
    pagenum: joi.number().min(0).default(0).optional().label("Page Number"),
    bookingId : joi.number().allow("").positive().optional(),
    room_number : joi.number().allow("").positive().optional(),
    checkIn: joi.date().allow("").optional(),
    checkOut: joi.date().allow("").optional(),
})

const OffersTableHistory = ()=>{
    const {id} = useParams()
    return <UniversalTable queryname="offers-table-history" datatable={datatable} querypath={APIROUTES.OFFERS.HISTORY(id)} title="History" onRowClick = {console.log}  searchData={searchInputs} schema={schema} paginate={true} />
}

export default OffersTableHistory