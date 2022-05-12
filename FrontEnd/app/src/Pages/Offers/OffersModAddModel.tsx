import offerData from "./OffersInterfaces"
import joi from "joi";
import UniversalForm from "../../components/UniversalForm";
import { IsearchData } from "../../components/UniversalTable/TableSchema";

export interface IformData {
    name: string,
    label: string
    type: "text" | "email" | "number" | "date" | "select"
    selectOptions? : {value : string,label: string}[]
}


const formData  : IsearchData[] = [
    {
        name:"name",
        label: "Offer Name",
        type: "text"
    }, 
    {
        name:"description",
        label: "Description",
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

const schema = joi.object({
    date_start: joi.date().required().label("Start Date"),
    date_end: joi.date().allow("",null).empty("").default(null).label("End Date"),
    price : joi.number().positive().label("Price"),
    name : joi.string().label("Name"),
    description : joi.string().label("Description")
})

const ClientsModAddModel = ({mutate,initData} : {mutate : any,initData? : offerData})=>{
    return <UniversalForm initData={initData}  mutate = {mutate} schema={schema} formData={formData} />
}

export default ClientsModAddModel