import Joi from "joi";
import UniversalFormUi from "../../components/UniversalForm/UniversalFormUi";
import BookingCardContainer from "../../components/BookingCardContainer"
import { useEffect, useState } from "react";

import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {  IUniversalTable } from "../../types";

const formData  : IUniversalTable.IsearchData[] = [
    {
        name:"NAME",
        label: "Name",
        type: "text"
    },    
    {
        name:"DATE_CHECKIN",
        label: "Check In",
        type: "date"
    },
    {
        name:"DATE_CHECKOUT",
        label: "Check Out",
        type: "date"
    }
]

const room_schema = Joi.object({
    ROOM_ID: Joi.number().required().label("Room"),
    OFFER_ID: Joi.number().required().label("Offer"),
    ALLOCATED_ROOM_ID: Joi.number().optional(),
    ROOM_TYPE: Joi.required().label("Room Type"),
    ROOM_CAPACITY: Joi.required().label("Room Capacity"),
    ROOM_NUMBER: Joi.required().label("Room Number"),
    ROOM_OPTION: Joi.required().label("Room Option"),
    OFFER_NAME: Joi.required().label("Offer Name"),
    OFFER_PRICE: Joi.required().label("Offer Price"),
    FOOD_CHOICE: Joi.valid('H','N','F','SI','AI').required().label("Food Choice"),
    CLIENTS : Joi.array().min(1).label("Clients")
})
const schema = Joi.object({
    NAME: Joi.string().required().label("Name"),
    BOOKING_ID: Joi.optional().label("Booking Id"),
    DATE_CHECKIN: Joi.date().required().label("Check In"),
    DATE_CHECKOUT: Joi.date().required().label("Check Out"),
    ROOMS: Joi.array().items(room_schema).label("Rooms")
})

const BookingsModAddModel = ({mutate,initData = {}} : {mutate : any,initData? : any })=>{

    //for the main form
    const methods = useForm({
        shouldUnregister: false,
        shouldFocusError: true,
        resolver: joiResolver(schema),
        defaultValues : initData
    });

    const { register, setValue, control, reset , formState: { errors }} = methods

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "ROOMS", // unique name for your Field Array
    })

    useEffect(()=>{
        setValue('BOOKING_ID' as const,initData.BOOKING_ID)
        setValue('ROOMS' as const,initData.ROOMS)
    },[])
    
    return <>
     <UniversalFormUi hideSubmit={true} initData={initData} reset={reset} register={register} handleSubmit={(data: any)=>null} setValue={setValue} formData={formData}  errors={errors} /> 
     <FormProvider  {...methods} >
     <RoomsContainer mutate={mutate} initData={initData}/>
     </FormProvider>
    </>
}

const RoomsContainer = ({mutate,initData} :{mutate: any,initData: any} )=>{
    return <BookingCardContainer initData={initData} mutate={mutate} />
}

export default BookingsModAddModel