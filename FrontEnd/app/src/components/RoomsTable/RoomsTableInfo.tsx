import {IUniversalTable} from "../../types"
import joi from "joi"
import React from "react"
import APIROUTES from "../../constants/ApiRoutes"
import UniversalTable from "../UniversalTable"
const searchInputs  : IUniversalTable.IsearchData[] = [
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

const datatable  = (body: any) : IUniversalTable.ItableData => ({
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

const RoomsTableInfo : React.FC<{onRowClick?: any}> = ({onRowClick})=>{
    return <UniversalTable queryname="room-table-info" datatable={datatable} querypath={APIROUTES.ROOMS.INFO} title="Rooms" onRowClick = {onRowClick}  searchData={searchInputs} schema={schema} paginate={true} />
}

export default RoomsTableInfo