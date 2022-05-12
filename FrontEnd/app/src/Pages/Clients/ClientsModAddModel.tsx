import userData from "./ClientInterfaces"
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import joi from "joi";
import { useEffect } from "react";
import Select from "react-select";
import UniversalForm from "../../components/UniversalForm";

export interface IformData {
    name: string,
    label: string
    type: "text" | "email" | "number" | "date" | "select"
    selectOptions? : {value : string,label: string}[]
}

const schema = joi.object({
    fullname: joi.string().required().label("Full Name"),
    address: joi.string().required().label("Address"),
    date_of_birth: joi.date().required().label("Birth Date"),
    cin: joi.string().required().label("CIN"),
    job: joi.string().allow("",null).empty("").default(null).label("Job"),
    gender: joi.allow("F","M").required().label("Gender"),
    state: joi.allow("S","D","M").required().label("State"),
})

const formData : IformData[] = [
    {
        name:"fullname",
        label: "Full Name",
        type: "text"
    },    
    {
        name:"address",
        label: "Address",
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
        name:"job",
        label: "Job",
        type: "text"
    },
    {
        name:"state",
        label: "State",
        type: "select",
        selectOptions : [{label: "Single",value: "S"},{label: "Divorced",value: "D"},{label: "Married",value: "M"}]
    },
    {
        name:"gender",
        label: "Gender",
        type: "select",
        selectOptions : [{label: "Male",value: "M"},{label: "Female",value: "F"}]
    }

]

const ClientsModAddModel = ({mutate,initData} : {mutate : any,initData? : userData})=>{

    return <UniversalForm initData={initData}  mutate = {mutate} schema={schema} formData={formData} />
}

export default ClientsModAddModel