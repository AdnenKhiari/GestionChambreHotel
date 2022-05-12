import OffersTableInfo from "../../components/Offers Table/OffersTableInfo"
import { useMutateQuery } from "../../lib/Queries/useMutateQuery"
import  ROUTES from "../../constants/ApiRoutes"
const OffersDel = ()=>{
    const {mutate} = useMutateQuery(ROUTES.OFFERS.DELETE,"DELETE",undefined,["offers-table-info"])
    const red = (row : any[])=>{
        mutate({id: row[0]})
    }
    return <OffersTableInfo  onRowClick={red} />
}
export default OffersDel