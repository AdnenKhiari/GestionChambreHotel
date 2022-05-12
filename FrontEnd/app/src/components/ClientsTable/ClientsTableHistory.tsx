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

const datatable  = (body: any) : ItableData => ({
    header:["Booking ID","Room ID","Check In","Check Out"],
    body: body
})
const schema = joi.object({
    pagenum: joi.number().min(0).default(0).optional().label("Page Number"),
    bookingId : joi.number().allow("").positive().optional(),
    roomId : joi.number().allow("").positive().optional(),
    checkIn: joi.date().allow("").optional(),
    checkOut: joi.date().allow("").optional(),
    gender: joi.optional()
})

const ClientsTableHistory = ()=>{
    const {id} = useParams()
    return <> 
        <UniversalTable queryname="client-table-history" datatable={datatable} querypath={APIROUTES.CLIENTS.HISTORY(id)} title="History" onRowClick = {console.log}  searchData={searchInputs} schema={schema} paginate={true} />
    </>
}

export default ClientsTableHistory