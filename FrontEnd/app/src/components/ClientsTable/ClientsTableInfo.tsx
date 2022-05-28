import UniversalTable from "../UniversalTable"
import joi from "joi"
import APIROUTES from "../../constants/ApiRoutes"
import { IUniversalTable } from "../../types"

const searchInputs  : IUniversalTable.IsearchData[] = [
    {
        name: "id",
        type: "number",
        label: "Clients ID"
    },
    {
        name:"fullname",
        label: "Full Name",
        type: "text"
    },    
    {
        name:"date_of_birth",
        label: "Birth Date",
        type: "date"

    },
    {
        name:"cin",
        label: "CIN",
        type: "text"
    },
    {
        name:"gender",
        label: "Gender",
        type: "select",
        selectOptions : [{label: "Male",value: "M"},{label: "Female",value: "F"}]
    }
]

const datatable  = (body: any) : IUniversalTable.ItableData => ({
    header:["Client ID","Full Name","CIN","Birth Date","Gender"],
    body: body
})

const schema = joi.object({
    id : joi.number().allow("").positive(),
    fullname: joi.string().allow("").required().label("Full Name"),
    date_of_birth: joi.date().allow("").required().label("Birth Date"),
    cin: joi.string().allow("").required().label("CIN"),
    gender: joi.allow("F","M").allow("").required().label("Gender"),
    pagenum: joi.number().min(0).default(0).optional().label("Page Number")
})

const ClientsTableInfo = ({onRowClick} : {onRowClick?: any})=>{

    return   <UniversalTable queryname="client-table-info" datatable={datatable} querypath={APIROUTES.CLIENTS.INFO} title="Clients" onRowClick = {onRowClick}  searchData={searchInputs} schema={schema} paginate={true} />

}

export default ClientsTableInfo