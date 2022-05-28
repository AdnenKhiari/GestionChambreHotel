import joi from "joi";
import UniversalForm from "../../components/UniversalForm";
import { IUniversalForm, roomData } from "../../types";

export interface IformData {
    name: string,
    label: string
    type: "text" | "email" | "number" | "date" | "select"
    selectOptions? : {value : string,label: string}[]
}


const formData  : IUniversalForm.IformData[] = [

    {
        name: "room_number",
        type: "number",
        label: "Rooms Number"
    },    
    {
        name:"capacity",
        type: "select",
        label: "Capacity",
        selectOptions : [{label: "Single",value: "S"},{label: "Double",value: "D"},{label: "Triple",value: "T"},{label: "Quadruple",value: "Q"}]
    },
    {
        name:"type",
        type: "select",
        label: "Room Type",
        selectOptions : [{label: "Room",value: "R"},{label: "Suite",value: "S"}]
    },
    {
        name:"options",
        type: "select",
        label: "Room Option",
        selectOptions : [{label: "Default",value: "D"},{label: "Pool",value: "P"},{label: "Sea",value: "S"}]
    }
    ,
    {
        name:"state",
        type: "select",
        label: "Room State",
        selectOptions : [{label: "Free",value: "F"},{label: "Occupied",value: "O"},{label: "Repairing",value: "M"},{label: "Closed",value: "C"}]
    }
]

const schema = joi.object({
    room_number: joi.number().allow("").required().label("Room Number"),
    capacity: joi.allow("S","D","T","Q","").required().label("Room Capacity"),
    type: joi.allow("R","S","").required().label("Room Type"),
    options: joi.allow("D","P","S","").required().label("Room Options"),
    state: joi.allow("F","O","M","C","").required().label("Room State"),
})

const RoomsModAddModel : React.FC<{mutate : (dt: any) => void,initData? : roomData}> = ({mutate,initData} )=>{

    return <UniversalForm initData={initData}  mutate = {mutate} schema={schema} formData={formData} />
}

export default RoomsModAddModel