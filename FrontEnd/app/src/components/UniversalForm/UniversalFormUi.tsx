import { useEffect } from "react";
import { UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetError, UseFormSetValue } from "react-hook-form";
import Select from "react-select";
import { IUniversalForm } from "../../types";

interface IUniFormUi {
    register: UseFormRegister<any>,
    errors: any,
    formData: IUniversalForm.IformData[],
    initData: any,
    setValue: UseFormSetValue<any>,
    reset: UseFormReset<any>,
    handleSubmit: (dt: any)=> void,
    hideSubmit?: boolean
}

const UniversalFormUi : React.FC<IUniFormUi>= ({register,errors,formData,initData,setValue,reset,handleSubmit,hideSubmit = false})=>{
    
    const getSelectDefaultValue = (sd : any)=>{
        let res :any = null
        if(initData!==undefined)
            res=sd.selectOptions?.find((item : any)=> item.value === initData[sd.name]) 
        else
            res=sd.selectOptions?.at(0)
            setValue(sd.name,res.value)

        return res
    }

    return <div className="info-form">
    <form onReset={reset} onSubmit={handleSubmit} >
        <div className="input-container">
        {formData.map((sd : any,index : number)=>(
            <div className="form-item" key={index+120}>
            <label htmlFor={sd.name}>{sd.label}</label>
            {sd.type === "select" ? (
            <>
            <Select key={index} options={sd.selectOptions}     
            theme={(theme) => ({
                ...theme,
                borderRadius: 5,
                menuGutter : 0,
                colors: {
                ...theme.colors,
                    text: '#2C2738',
                    primary25: '#DBE2EA',
                    primary: 'rgba(8,128,174,1)',
                    primary50: '#F2AC57',
                }
                })} 
                onChange={(dt)=>setValue(sd.name,dt?.value)}
                isSearchable={false}
                defaultValue={  getSelectDefaultValue(sd) }  
                className="select-drop"                
                classNamePrefix="select-drop-pre"/>
                {errors && <p className="danger-text"> {errors[sd.name]?.message.replace('"','')}</p>}

                </>
                ) : ( <>
                <input type={sd.type} className={errors && errors[sd.name]!== undefined ? "input-error" : ""} key={index} id={sd.name} placeholder={sd.label} {...register(sd.name)}/>
                {errors && <p className="danger-text"> {errors[sd.name]?.message.replace('"','')}</p>}
                </>
                )
            }
            </div>
        ))}
        </div>
        {!hideSubmit &&  <button type="submit">Submit</button>}
    </form>
    </div>
}

export default UniversalFormUi