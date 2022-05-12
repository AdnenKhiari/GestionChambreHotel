import UniversalTable from "../UniversalTable"
import {IsearchData,ItableData} from "../UniversalTable/TableSchema"
import TableSearch from "../UniversalTable/TableSearch"
import TableContent from "../UniversalTable/TableContent"

import joi from "joi"
import React from "react"
import APIROUTES from "../../constants/ApiRoutes"
import {useUrlParams} from "../../lib/Queries/useUrlParams"

const searchInputs  : IsearchData[] = [
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

const datatable  = (body: any) : ItableData => ({
    header:["Client ID","Full Name","CIN","Birth Date","Gender"],
    body: body
})
const datarows = [
    ["Ali eeeeeeeeeeeeeee",10,"Hey","15-21-2015"],
    ["Saleh eeeeeee ",20,"Hey","15-21-2015"],
    ["Ali ee",10,"Hey","15-21-2015"],
    ["Saleheeeeeeeeeeeeeeeee ",20,"Hey","15-21-2015"],
    ["Ali eeeeeeee",10,"Hey","15-21-2015"],
    ["Saleh  aaaaaaaaaaa",20,"Hey","15-21-2015"],
]

const schema = joi.object({
    id : joi.number().allow("").positive(),
    fullname: joi.string().allow("").required().label("Full Name"),
    date_of_birth: joi.date().allow("").required().label("Birth Date"),
    cin: joi.string().allow("").required().label("CIN"),
    gender: joi.allow("F","M").allow("").required().label("Gender"),
    pagenum: joi.number().min(0).default(0).optional().label("Page Number")
})

const ClientsTableInfo = ({onRowClick} : {onRowClick?: any})=>{
  /*  const { onValidate ,isLoading,isError,payload} = useUrlParams('client-table-info',APIROUTES.CLIENTS.info)
   return <div className="uniTable" >
        <div>
        <h2><span className="border"></span>Clients</h2>
        <TableSearch  paginate={true} onValidate={onValidate} searchData={searchInputs} schema={schema} />
        </div>
        {isLoading && <h1>Loading...</h1> }
        {!isLoading && isError && <h1>Error !</h1> }
        {!isError && !isLoading && payload  && <TableContent tableData={datatable(payload.data)} onclick={onRowClick ? onRowClick : (dt : any)=>console.log(dt)}/>}
    </div>*/

    return <>
        <UniversalTable queryname="client-table-info" datatable={datatable} querypath={APIROUTES.CLIENTS.INFO} title="Clients" onRowClick = {onRowClick}  searchData={searchInputs} schema={schema} paginate={true} />
    </>
}

export default ClientsTableInfo