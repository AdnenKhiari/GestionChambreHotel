import express from "express"
import ClientsRouter from "./Client"
import RoomsRouter from "./Rooms"
import BookingsRouter from "./Bookings"
import OffersRouter from "./Offers"
import AuthRouter from "./Auth"
import {Authenticate} from "./Auth"

const app = express.Router()


app.use("/auth",AuthRouter)
app.use("/clients",Authenticate,ClientsRouter)
app.use("/bookings",Authenticate,BookingsRouter)
app.use("/offers",Authenticate,OffersRouter)
app.use("/rooms",Authenticate,RoomsRouter)

export default app