import UniversalTable from "../UniversalTable"
import joi from "joi"
import APIROUTES from "../../constants/ApiRoutes"
import {IUniversalTable} from "../../types"

const searchInputs  :  IUniversalTable.IsearchData[] = [
    {
        name: "id",
        type: "number",
        label: "Offer ID"
    },
    {
        name:"name",
        label: "Offer Name",
        type: "text"
    }, 
    {
        name:"date_start",
        label: "Start Date",
        type: "date"
    },    
    {
        name:"date_end",
        label: "End Date",
        type: "date"

    },
    {
        name:"price",
        label: "Price",
        type: "number"
    }
]

const datatable  = (body: any) : IUniversalTable.ItableData => ({
    header:["Offer ID","Offer Name","Start Date","End Date","Price"],
    body: body
})

const schema = joi.object({
    id : joi.number().allow("").positive(),
    date_start: joi.date().allow("").required().label("Start Date"),
    date_end: joi.date().allow("").required().label("End Date"),
    price : joi.number().positive().allow("").label("Price"),
    name : joi.string().allow("").label("Name"),
    pagenum: joi.number().min(0).default(0).optional().label("Page Number")
})

const OffersTableInfo = ({onRowClick} : {onRowClick?: any})=>{
    return <UniversalTable queryname="offers-table-info" datatable={datatable} querypath={APIROUTES.OFFERS.INFO} title="Offers" onRowClick = {onRowClick}  searchData={searchInputs} schema={schema} paginate={true} />
}

export default OffersTableInfo