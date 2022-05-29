import joi from "joi";
import UniversalForm from "../../components/UniversalForm";

import { IUniversalForm,offerData } from "../../types";

const formData  : IUniversalForm.IformData[] = [
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
    date_end: joi.date().allow("",null).empty("").default(null).optional().label("End Date"),
    price : joi.number().positive().required().label("Price"),
    name : joi.string().required().label("Name"),
    description : joi.string().required().label("Description")
})

const ClientsModAddModel = ({mutate,initData} : {mutate : any,initData? : offerData})=>{
    return <UniversalForm initData={initData}  mutate = {mutate} schema={schema} formData={formData} />
}

export default ClientsModAddModel