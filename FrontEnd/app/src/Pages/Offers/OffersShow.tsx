import OffersTableHistory from "../../components/Offers Table/OffersTableHistory"
import { Routes,Route, Navigate, useNavigate, useParams } from "react-router-dom"
import OffersTableInfo from "../../components/Offers Table/OffersTableInfo"
import ROUTES from "../../constants/Routes"
import { useGetQuery } from "../../lib/Queries/useGetQuery"
import APIROUTES from "../../constants/ApiRoutes"
import {offerData} from "../../types"
const OffersShow = ()=>{
    return <Routes>
        <Route path=":id" element={<ShowComponent />} />
        <Route path="" element={<SearchComponent />} />
    </Routes>
}

const SearchComponent = ()=>{
    const navigate = useNavigate()
    const red = (row : any[])=>{
        navigate(ROUTES.OFFERS.SHOW+row[0])
    }
    return <OffersTableInfo  onRowClick={red} />
}

const ShowComponent = ()=>{

    const  {id } = useParams()
    const {payload : odata,isLoading,isError,refetch} = useGetQuery(['get-offer-by-id',id],APIROUTES.OFFERS.GETBYID(id))
    if(isError)
        return <h1 className="danger-color">Error !</h1>
    if(isLoading)
        return <p className="warning-color">Loading !</p>
    else
  //      console.log(odata)

return <div className="page">
        <section className="page-header">
            <div className="section-1">
                <h1> Offer:<span>#{odata.id}</span> </h1>
                <div className={"labelitem " + (new Date(odata.date_end) <= new Date() ? "success" : "danger") }>{odata.here ? "Active" : "Inactive"}</div>
            </div>            
            <div className="section-2">
            <p>Price :<span>{odata.price}</span> </p>
            </div>
        </section>
        <section className="page-body">
            <OfferInfo data={odata}/>
            <OffersTableHistory/>
        </section>
        <section className="page-footer">
            
        </section>
    </div>
}
const OfferInfo : React.FC<{data : offerData}>= ({data})=>{
    return <div className="info-box">
        <p className="info-box-title">MetaData: </p>
        <div className="info-box-data">
            <p className="info-box-data-item"><span>Offer Name:</span>{data.name}</p>
            <p className="info-box-data-item"><span>Date Start:</span>{data.date_start}</p>
            {data.date_end && <p className="info-box-data-item"><span>Date End:</span>{data.date_end}</p>}
            <p className="info-box-data-item"><span>Price:</span>{data.price}</p>
            <p className="info-box-data-item"><span>Description:</span>{data.description}</p>
        </div>
    </div>
}
export default OffersShow