import {IsearchData,ItableData} from "../UniversalTable/TableSchema"
import TableSearch from "../UniversalTable/TableSearch"
import TableContent from "../UniversalTable/TableContent"

import joi from "joi"
import React from "react"
import APIROUTES from "../../constants/ApiRoutes"
import {useUrlParams} from "../../lib/Queries/useUrlParams"
import UniversalTable from "../UniversalTable"

const searchInputs  : IsearchData[] = [
    {
        name: "id",
        type: "number",
        label: "Rooms ID"
    },
    {
        name: "room_number",
        type: "number",
        label: "Rooms Number"
    },    
    {
        name:"capacity",
        type: "select",
        label: "Capacity",
        selectOptions : [{label: "Any",value: ""},{label: "Single",value: "S"},{label: "Double",value: "D"},{label: "Triple",value: "T"},{label: "Quadruple",value: "Q"}]
    },
    {
        name:"type",
        type: "select",
        label: "Room Type",
        selectOptions : [{label: "Any",value: ""},{label: "Room",value: "R"},{label: "Suite",value: "S"}]
    },
    {
        name:"options",
        type: "select",
        label: "Room Option",
        selectOptions : [{label: "Any",value: ""},{label: "Default",value: "D"},{label: "Pool",value: "P"},{label: "Sea",value: "S"}]
    }
    ,
    {
        name:"state",
        type: "select",
        label: "Room State",
        selectOptions : [{label: "Any",value: ""},{label: "Free",value: "F"},{label: "Occupied",value: "O"},{label: "Repairing",value: "M"},{label: "Closed",value: "C"}]
    }
]

const datatable  = (body: any) : ItableData => ({
    header:["Rooms Id","Rooms Number","Capaciy","Room Type","Room Option","Room State"],
    body: body
})


const schema = joi.object({
    id : joi.number().allow("").positive(),
    room_number: joi.number().allow("").required().label("Room Number"),
    capacity: joi.allow("S","D","T","Q","").required().label("Room Capacity"),
    type: joi.allow("R","S","").required().label("Room Type"),
    options: joi.allow("D","P","S","").required().label("Room Options"),
    state: joi.allow("F","O","M","C","").required().label("Room State"),
    pagenum: joi.number().min(0).default(0).optional().label("Page Number")

})

const RoomsTableInfo = ({onRowClick} : {onRowClick?: any})=>{
   /*const { onValidate ,isLoading,isError,payload} = useUrlParams('rooms-table-info',APIROUTES.ROOMS.INFO)
   return <div className="uniTable" >
        <div>
        <h2><span className="border"></span>Rooms</h2>
        <TableSearch  paginate={true} onValidate={onValidate} searchData={searchInputs} schema={schema} />
        </div>
        {isLoading && <h1>Loading...</h1> }
        {!isLoading && isError && <h1>Error !</h1> }
        {!isError && !isLoading && payload  && <TableContent tableData={datatable(payload.data)} onclick={onRowClick ? onRowClick : (dt : any)=>console.log(dt)}/>}
    </div>
*/
    return <>
        <UniversalTable queryname="room-table-info" datatable={datatable} querypath={APIROUTES.ROOMS.INFO} title="Rooms" onRowClick = {onRowClick}  searchData={searchInputs} schema={schema} paginate={true} />
    </>
}

export default RoomsTableInfo