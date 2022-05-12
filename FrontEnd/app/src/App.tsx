import React from 'react';
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import { Routes ,Route} from 'react-router-dom';
import Heading from './components/Heading';
import ROUTES from "./constants/Routes"
import ClientsPages from "./Pages/Clients/"
import RoomsPages from "./Pages/Rooms/"
import OffersPages from "./Pages/Offers/"
import BookingsPages from "./Pages/Bookings/"

function App() {
  return (
    <div className="App">
        <div className="maincontainer">
              <div className="MainMenu">
                <Menu />
              </div>
              <div className="main-block">
                <Heading /> 
                <div className="main-content">
                <Routes >
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
              </div>
        </div>
        < Footer />

    </div>
  );
}

export default App;
