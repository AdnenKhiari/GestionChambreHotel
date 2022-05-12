import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Select from "react-select";
import Joi from "joi";
import UniversalFormUi from "./UniversalFormUi";

export interface IformData {
    name: string,
    label: string
    type: "text" | "email" | "number" | "date" | "select"
    selectOptions? : {value : string,label: string}[]
}


const UniversalForm = ({schema,formData,mutate,initData,hideSubmit = false } : {schema: Joi.ObjectSchema,formData: IformData[], mutate : any,initData? : any,hideSubmit?: boolean })=>{

 
    const { register,handleSubmit, setValue, control, watch, reset , formState: { errors }} = useForm({
        shouldUnregister: true,
        shouldFocusError: true,
        resolver: joiResolver(schema),
        defaultValues : initData
      });
      const validate = handleSubmit((data)=>{
            mutate(data)
            console.log(data)
        })
      return <UniversalFormUi hideSubmit={hideSubmit} initData={initData} reset={reset} register={register} handleSubmit={validate} setValue={setValue} formData={formData}  errors={errors} />
}

export default UniversalForm