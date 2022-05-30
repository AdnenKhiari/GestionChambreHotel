import TableContent from "../UniversalTable/TableContent"
import Select from "react-select";
import { useFormContext } from "react-hook-form";
import { IUniversalTable } from "../../types";
import { BookingContext } from "../../lib/context";
import { useContext } from "react";

const datatable  = (body: any) : IUniversalTable.ItableData => ({
    header:["Client ID","Name","Birth Date","Gender"],
    body: body
}) 

export const CardItem = ({index} : {index:number} )=>{
    const {watch,setValue} = useFormContext()
    const {setSelectedIndexRoom,setComState} = useContext(BookingContext) || {}

    return <div className="card-item" >
    <div className="card-section-1">
            <Details index={index} />
    </div>
    <div className="card-section-seperator"></div>
    <div className="card-section-2">
        <div className="uniTable" > 
            <TableContent onclick={(row: any[])=>{
                const clients : any[] = watch(`ROOMS.${index}.CLIENTS`)
                let client_id_index = clients.findIndex(dt => dt[0] === row[0])
                clients.splice(client_id_index,1)
               // clients.splice(client_id_index,1)

                setValue(`ROOMS.${index}.CLIENTS` as const,clients)
            }} 
            tableData={datatable(watch(`ROOMS.${index}.CLIENTS` as const))}/>
            <button onClick={(e)=>{
                setSelectedIndexRoom?.(index)
                setComState?.('SC')
            }
            }>Add Client</button>
        </div>
    </div>
    </div>
}

const selectOptions = [{label: "All Inclusive",value: "AI"},{label: "Soft Inclusive",value: "SI"},{label: "Full Board",value: "F"},{label: "Half Board",value: "H"},{label: "Lodge Only",value: "N"}]

export const Details : React.FC<{index: number}>= ({index})=>{
    const {setSelectedIndexRoom,setComState} = useContext(BookingContext) || {}

    const {watch,setValue,formState : {errors}} = useFormContext()
    return  <div className="card-details">
        <div className="card-details-header">
            <p>Room Number : </p>
            <p>{watch(`ROOMS.${index}.ROOM_NUMBER`)}</p>
        </div>

        <div className="card-details-body">
        <div className="card-detail-item">
            <button onClick={(e)=>{
                setSelectedIndexRoom?.(index)
                setComState?.('SO')
            }
            }>Select Offer </button>

            <button onClick={(e)=>{
                setSelectedIndexRoom?.(index)
                setComState?.('SR')
            }
            }>Update Room </button>

            <button onClick={(e)=>{
                const rooms : any[] = watch(`ROOMS`)
                rooms.splice(index,1)
                setValue(`ROOMS` as const,rooms)
            }
            }>Remove Room </button>
        </div>

        <RoomDetails index={index}  />
        <OfferDetails index={index} />
        
        {errors && errors.ROOMS && errors.ROOMS[index]  &&  Object.values(errors.ROOMS[index]).map((err: any,index: number)=>{
           return <p key={index} className="danger-text"> { err.message.replace('"','')}</p>
        })}

        </div>
    </div>
}

const RoomDetails = ({index} : {index: number})=>{
    const {watch,setValue} = useFormContext()

    const getSelectDefaultValue = (name: string)=>{
        let res = watch(name)
        if(!res){
            res= selectOptions?.at(0)
        } 
        return res
    }

    return <>

<div className="card-detail-item">
            <label htmlFor={`ROOMS.${index}.FOOD_CHOICE` as const}>Food Choice</label>
            { (watch(`ROOMS.${index}.FOOD_CHOICE` as const)+'4') && <Select  options={selectOptions}     
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
                name={`ROOMS.${index}.FOOD_CHOICE`}
                onChange={(dt)=>setValue(`ROOMS.${index}.FOOD_CHOICE` as const,dt?.value)}
                value={selectOptions.filter((dt)=>dt.value === watch(`ROOMS.${index}.FOOD_CHOICE` as const))}
                isSearchable={false}
                defaultValue={getSelectDefaultValue(`ROOMS.${index}.FOOD_CHOICE` as const) }  
                className="select-drop"                
                classNamePrefix="select-drop-pre"/>}
        </div>

        <div className="card-detail-item">
            <label >Room Type: </label> 
            <p>{watch(`ROOMS.${index}.ROOM_TYPE` as const)}</p>
        </div>

        <div className="card-detail-item">
            <label >Capacity: </label> 
            <p>{watch(`ROOMS.${index}.ROOM_CAPACITY` as const)}</p>
        </div>    

        <div className="card-detail-item">
            <label >Room View: </label> 
            <p>{watch(`ROOMS.${index}.ROOM_OPTION` as const)}</p>
        </div>

    </>
}
const OfferDetails = ({index} : {index: number})=>{
    const {watch} = useFormContext()

    return <> <div className="card-detail-item">
        <label >Offer Name : </label> 
        <p>{watch(`ROOMS.${index}.OFFER_NAME` as const)}</p>
    </div>
    <div className="card-detail-item">
        <label >Price: </label> 
        <p>{watch(`ROOMS.${index}.OFFER_PRICE` as const)}</p>
    </div>
    </>
}