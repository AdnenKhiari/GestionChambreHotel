import React, { useEffect, useState } from 'react';
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import { Routes ,Route, useLocation} from 'react-router-dom';
import Heading from './components/Heading';
import ROUTES from "./constants/Routes"
import APIROUTES from "./constants/ApiRoutes"
import ClientsPages from "./Pages/Clients/"
import RoomsPages from "./Pages/Rooms/"
import OffersPages from "./Pages/Offers/"
import BookingsPages from "./Pages/Bookings/"
import { useGetQuery } from './lib/Queries/useGetQuery';
import Login from './Pages/Users/Login';
import { UserContext } from './lib/context';
import { LoadingCercle } from './components/LoadingCercle';
import { AnimatePresence } from 'framer-motion';
function App() {  
  const [userInfo,setUserInfo] = useState(null)
  const location = useLocation()
  const {payload : udata,isLoading,isError,refetch} = useGetQuery(["get-connected-user"],APIROUTES.USERS.GETLOGGED,
  (data: any)=>{
    setUserInfo(data)
  },
  (err: any)=>{
    setUserInfo(null)
  })
  
  if(isLoading)
    return  <LoadingCercle/>

  if(!userInfo || isError)
    return <Login key={1452} />

  return (
    <div className="App">
        <div className="maincontainer">
              <div className="MainMenu">
                <Menu />
              </div>
              <div className="main-block">
                <UserContext.Provider value={{userInfo,setUserInfo}}>
                <Heading /> 
                <div className="main-content">
                
                <Routes location={location} key={location.pathname} >
                  <Route path={ROUTES.CLIENTS.SHOW+"*"} element={<ClientsPages.ClientsShow />} />
                  <Route path={ROUTES.CLIENTS.ADD+"*"} element={<ClientsPages.ClientsAdd />} />
                  <Route path={ROUTES.CLIENTS.MOD+"*"} element={<ClientsPages.ClientMod />} />
                  <Route path={ROUTES.CLIENTS.DEL} element={<ClientsPages.ClientDel />} />

                  <Route path={ROUTES.ROOMS.SHOW+"*"} element={<RoomsPages.RoomsShow />} />
                  <Route path={ROUTES.ROOMS.ADD+"*"} element={<RoomsPages.RoomsAdd />} />
                  <Route path={ROUTES.ROOMS.MOD+"*"} element={<RoomsPages.RoomsMod />} />
                  <Route path={ROUTES.ROOMS.DEL} element={<RoomsPages.RoomsDel />} />
                  
                  <Route path={ROUTES.OFFERS.SHOW+"*"} element={<OffersPages.OffersShow />} />
                  <Route path={ROUTES.OFFERS.ADD+"*"} element={<OffersPages.OffersAdd />} />
                  <Route path={ROUTES.OFFERS.MOD+"*"} element={<OffersPages.OffersMod />} />
                  <Route path={ROUTES.OFFERS.DEL} element={<OffersPages.OfferDel />} />

                  <Route path={ROUTES.BOOKING.ADD+"*"} element={<BookingsPages.BookingsAdd />} />
                  <Route path={ROUTES.BOOKING.MOD+"*"} element={<BookingsPages.BookingsMod />} />
                  <Route path={ROUTES.BOOKING.DEL+"*"} element={<BookingsPages.BookingsDel />} />
                  <Route path={ROUTES.BOOKING.SHOW+"*"} element={<BookingsPages.BookingsShow />} />

                  <Route path='/lel' element={<h1>Lel2</h1>} />
                </Routes>
                </div>
                </UserContext.Provider>
              </div>
        </div>
        < Footer />

    </div>
  );
}

export default App;
