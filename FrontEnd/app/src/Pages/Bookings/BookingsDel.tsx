import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
import  ROUTES from "../../constants/ApiRoutes"
import BookingsTableInfo from "../../components/BookingsTable/BookingsTableInfo"
const BookingsDel = ()=>{
    const {mutate} = useMutateQuery(ROUTES.BOOKINGS.DELETE,"DELETE",undefined,["bookings-table-info"])
    const red = (row : any[])=>{
        mutate({id: row[0]})
    }
    return <BookingsTableInfo  onRowClick={red} />
}
export default BookingsDel