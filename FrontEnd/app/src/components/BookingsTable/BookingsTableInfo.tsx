import UniversalTable from "../UniversalTable"
import joi from "joi"
import APIROUTES from "../../constants/ApiRoutes"
import { IUniversalTable } from "../../types"

const searchInputs  : IUniversalTable.IsearchData[] = [
    {
        name: "id",
        type: "number",
        label: "Booking ID"
    },
    {
        name:"name",
        label: "Name",
        type: "text"
    },    
    {
        name:"date_checkin",
        label: "Check In",
        type: "date"
    },
    {
        name:"date_checkout",
        label: "Check Out",
        type: "date"
    }
]

const datatable  = (body: any) : IUniversalTable.ItableData => ({
    header:["Booking ID","Name","Check In","Check Out"],
    body: body
})
const schema = joi.object({
    id : joi.number().allow("").optional().positive(),
    name: joi.string().allow("").optional().label("Name"),
    date_checkin: joi.date().allow("").optional().label("Check In"),
    date_checkout: joi.date().allow("").optional().label("Check Out"),
    pagenum: joi.number().min(0).default(0).optional().label("Page Number")
})

const ClientsTableInfo = ({onRowClick} : {onRowClick?: any})=>{
    return <UniversalTable queryname="bookings-table-info" datatable={datatable} querypath={APIROUTES.BOOKINGS.INFO} title="Bookings" onRowClick = {onRowClick}  searchData={searchInputs} schema={schema} paginate={true} />
}

export default ClientsTableInfo