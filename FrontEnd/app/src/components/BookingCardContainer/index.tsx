import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";
import React, { createContext, useContext, useState } from "react";
import ClientsTableInfo from "../ClientsTable/ClientsTableInfo";
import RoomsTableInfo from "../RoomsTable/RoomsTableInfo";
import {CardItem} from "./Cards"
import OffersTableInfo from "../Offers Table/OffersTableInfo";
import { BookingContext } from "../../lib/context";
import { RoomBookingType, bkroomData } from "../../types";
import { motion } from "framer-motion";
import { StaggerChildren } from "../../lib/Animations";

const BookingCardContainer : React.FC<{initData:any,mutate: (dt: any) => void}> = ({initData,mutate})=>{

    const [compstate,setComState] = useState<RoomBookingType>('R')
    const [selectedIndexRoom,setSelectedIndexRoom] = useState(-1)
    const { handleSubmit} = useFormContext()

    const { fields, append, remove } = useFieldArray({
      name: "ROOMS", // unique name for your Field Array
    });

    const submitData = ()=>{
        handleSubmit((booking_data)=>{
            let rooms_to_remove = initData.ROOMS ? initData.ROOMS.map((rm: any)=> rm.ALLOCATED_ROOM_ID).filter((ALLOCATED_ROOM_ID : any) => booking_data.ROOMS.filter((new_room : any) => new_room.ALLOCATED_ROOM_ID === ALLOCATED_ROOM_ID ).length === 0 ) : []

            const data_to_send = {
                ROOMS_TO_REMOVE:rooms_to_remove,
                BOOKING_DATA: {
                    NAME : booking_data.NAME,
                    DATE_CHECKIN: booking_data.DATE_CHECKIN,
                    DATE_CHECKOUT: booking_data.DATE_CHECKOUT,
                    BOOKING_ID: booking_data.BOOKING_ID,
                    ROOMS : booking_data.ROOMS.map((room: any)=> {
                        let old_clients : any = [];
                        if(initData && initData.ROOMS){
                            old_clients = initData.ROOMS.find((rm:any)=> rm.ALLOCATED_ROOM_ID === room.ALLOCATED_ROOM_ID)
                            if(old_clients)
                                old_clients = old_clients.CLIENTS
                            else
                                old_clients=[]
                        } 
                        return {
                            ALLOCATED_ROOM_ID: room.ALLOCATED_ROOM_ID,
                            ROOM_ID: room.ROOM_ID,
                            OFFER_ID: room.OFFER_ID,
                            FOOD_CHOICE: room.FOOD_CHOICE.trim(),
                            CLIENTS_TO_ADD : room.CLIENTS.filter((c: any)=> old_clients.filter((old_c: any)=>  parseInt(c[0]) === parseInt(old_c[0])).length === 0 ).map((x: any)=>x[0]),
                            CLIENTS_TO_REMOVE: old_clients.filter((old_c: any)=>room.CLIENTS.filter((c: any)=>   parseInt(c[0]) === parseInt(old_c[0]) ).length === 0 ).map((x: any)=>x[0]) 
                        }
                    })
                }
            }
            mutate(data_to_send)
        })()
    }

   return <>
   <div className="rooms-bookings-header">
         <h1>Rooms</h1>
         <button onClick={(e)=>{
       setSelectedIndexRoom(-1)
       setComState('SR')
       }}> Add A Room</button>
    </div>
    <BookingContext.Provider value={{selectedIndexRoom,setSelectedIndexRoom,setComState}}>
   {compstate === 'R' ? ( <>  
    <div className="card-container" >
    {fields && fields.map((room: any,index: number)=>{
        return <CardItem  key={room.id} index={index} />
    })}
    </div>
    <div className="rooms-bookings-footer">
        <button onClick={submitData}>Submit Booking</button>
    </div>
    </>  
    ) : compstate === 'SR' ?  ( 
        <SelectRoom  append={append} />
    ) : compstate === 'SO'  ? (
        <SelectOffer  /> 
    ) : compstate === 'SC' &&  <SelectClients   /> 
    }
    </BookingContext.Provider>
    </>

}

const SelectClients = ()=>{
   const {setValue,watch} = useFormContext()
   const {selectedIndexRoom,setComState} = useContext(BookingContext) || {}
   const onRowClick = (row : any)=>{
        const clients  : any[] = watch(`ROOMS.${selectedIndexRoom}.CLIENTS`)
        const new_row = [row[0],row[1],row[3],row[4]]
        clients.push(new_row)
        setValue(`ROOMS.${selectedIndexRoom}.CLIENTS` as const,clients)
        setComState?.('R') 
    }
    return  <ClientsTableInfo  onRowClick={onRowClick}/>
}

const SelectRoom : React.FC<any>= ({append})=>{
    const {selectedIndexRoom,setComState} = useContext(BookingContext) || {}
    const {setValue} = useFormContext()
    const onRowClick = (row : any)=>{
        if(row[5] !== 'F')
            return;

        const new_room : bkroomData  = {
            ROOM_ID: row[0],
            ROOM_NUMBER: row[1],
            ROOM_CAPACITY: row[2],
            ROOM_TYPE: row[3],
            ROOM_OPTION: row[4],
            CLIENTS: [],
            OFFER_ID: '',
            FOOD_CHOICE: 'AI',
        }
        //fetch data by the room id
        if(selectedIndexRoom === -1){
            append(new_room)
        }else{
            setValue(`ROOMS.${selectedIndexRoom}.ROOM_ID`,new_room.ROOM_ID)
            setValue(`ROOMS.${selectedIndexRoom}.ROOM_NUMBER`,new_room.ROOM_NUMBER)
            setValue(`ROOMS.${selectedIndexRoom}.ROOM_CAPACITY`,new_room.ROOM_CAPACITY)
            setValue(`ROOMS.${selectedIndexRoom}.ROOM_TYPE`,new_room.ROOM_TYPE)
            setValue(`ROOMS.${selectedIndexRoom}.ROOM_OPTION`,new_room.ROOM_OPTION)
        }
        setComState?.('R')
    }
    return <RoomsTableInfo  onRowClick={onRowClick}/>
}

const SelectOffer = ()=>{
    const {setValue} = useFormContext()
    const {selectedIndexRoom,setComState} = useContext(BookingContext) || {}
    const onRowClick = (row : any)=>{
        if(row[3])
            return;
        setValue(`ROOMS.${selectedIndexRoom}.OFFER_ID` as const,row[0])
        setValue(`ROOMS.${selectedIndexRoom}.OFFER_NAME` as const,row[1])
        setValue(`ROOMS.${selectedIndexRoom}.OFFER_PRICE` as const,row[4])
        setComState?.('R')
    }
    return <OffersTableInfo  onRowClick={onRowClick}/>
}

export default BookingCardContainer