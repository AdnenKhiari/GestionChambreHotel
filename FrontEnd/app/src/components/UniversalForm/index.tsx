import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import UniversalFormUi from "./UniversalFormUi";
import { IUniversalForm } from "../../types";

interface UniFormType {
    schema: Joi.ObjectSchema,
    formData: IUniversalForm.IformData[],
    mutate : (dt: any)=> void,
    initData? : any,
    hideSubmit?: boolean 
}

const UniversalForm : React.FC<UniFormType> = ({schema,formData,mutate,initData,hideSubmit = false })=>{

    const { register,handleSubmit, setValue, control, watch, reset , formState: { errors }} = useForm({
        shouldUnregister: true,
        shouldFocusError: true,
        resolver: joiResolver(schema),
        defaultValues : initData
      });
      const validate  = handleSubmit((data)=>{
            mutate(data)
            console.log(data)
        })
      return <UniversalFormUi hideSubmit={hideSubmit} initData={initData} reset={reset} register={register} handleSubmit={validate} setValue={setValue} formData={formData}  errors={errors} />
}

export default UniversalForm