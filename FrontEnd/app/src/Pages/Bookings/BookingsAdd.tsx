import { Routes,Route, Navigate, useNavigate } from "react-router-dom"

import APIROUTES from "../../constants/ApiRoutes"
import BookingsModAddModel from "./BookingsModAddModel"

import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
const AddComponent = ()=>{
    const {payload : submitResponseData,isLoading : isMutationLoading, isError: isMutationError,mutate} = useMutateQuery(APIROUTES.BOOKINGS.ADD,'POST',undefined,["bookings-table-info"])

    return <div className="page">
    <section className="page-header">
        <div className="section-1">
            <h1>Add A Booking</h1>
        </div>            
    </section>
    
    <section className="page-body">
    {<BookingsModAddModel mutate={mutate}/>}
    </section>
    <section className="page-footer">
    </section>
</div>
}

const BookingsAdd = ()=>{
    return <AddComponent />
}

export default BookingsAdd