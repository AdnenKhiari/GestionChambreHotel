import Joi, { number, object } from "joi" 
import { useForm } from "react-hook-form";
import Select from "react-select"
import {IsearchData} from "./TableSchema"
import { joiResolver } from '@hookform/resolvers/joi';
import {Schema} from "joi"
import {defaultStyle} from "../../Styles/components/selectstyle"
import { useEffect, useState } from "react";
const TableSearch = ({searchData,schema ,onValidate,paginate = false} : {searchData : IsearchData[],schema : Schema,onValidate: any,paginate? : boolean})=>{
    //const inits : any = searchData.filter((dt)=>dt.selectOptions !== undefined).reduce((obj,current)=> ({...obj, [current.name] : current.selectOptions?.at(0)?.value }),{})
    const { register,handleSubmit, setValue,control, watch, reset , formState: { errors }} = useForm({
        shouldUnregister: true,
        resolver: joiResolver(schema)
    }); 
    useEffect(()=>{
        searchData.filter((dt)=>dt.selectOptions !== undefined).forEach((item)=>{
            setValue(item.name,item.selectOptions?.at(0)?.value)
        })
        if(paginate)
        setValue("pagenum",0)
    },[])

    return <form  className="tableSearch" onReset={reset} onSubmit={handleSubmit((data)=>{
        console.log(data)
        onValidate(data)
    })}>
        {searchData.map((sd,index)=>{
            if(sd.type === "select"){
                return <span key={index}>
                {sd.nullable && <i onClick={(e)=>{
                    setValue(sd.name,watch(sd.name) === null ? sd.selectOptions?.at(0)?.value: null)
                }}
                className="make-null-icon"></i>
                }
                {watch(sd.name) === null && <span>  {sd.label}</span>}
                {watch(sd.name)!=null && <Select key={index} options={sd.selectOptions}     
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
                  onChange={(dt)=>setValue(sd.name,dt?.value || "")}
                  isSearchable={false}
                  defaultValue={sd.selectOptions?.at(0)}
                  className="select-drop" 
                  isDisabled={watch(sd.name) === null}
                  classNamePrefix="select-drop-pre"/>}
                  </span>
            }else{ 
                return <span key={index}>
                {sd.nullable && <i onClick={(e)=>setValue(sd.name,watch(sd.name) === null ? "" : null)} className="make-null-icon"></i>}
                <input type={sd.type} disabled={watch(sd.name) === null} className={errors && errors[sd.name]!== undefined ? "input-error" : ""} key={index} id={sd.name} placeholder={sd.label} {...register(sd.name)}/>
                {/*errors && errors[sd.name]?.message*/}
                </span>
            }
        })}
        {paginate && <div className="pagination">
            <img className="paginate-prev" onClick={(e)=>setValue("pagenum", parseInt(watch("pagenum")) -1)} src="/icons/ARROW.svg" alt="left-arrow" />
            <input min={0} type="pagenum" placeholder="Page Number" id="pagenum" {...register("pagenum")}  />
            <img className="paginate-next"  onClick={(e)=>setValue("pagenum", parseInt(watch("pagenum")) +1)} src="/icons/ARROW.svg" alt="right-arrow" />
        </div>
        }

        <button type="submit">Submit</button>
 
     </form>
}
export default TableSearch