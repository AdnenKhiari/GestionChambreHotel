import express from "express"
import ClientsRouter from "./Client"
import RoomsRouter from "./Rooms"
import BookingsRouter from "./Bookings"

import OffersRouter from "./Offers"

const app = express.Router()

app.use("/clients",ClientsRouter)
app.use("/bookings",BookingsRouter)
app.use("/offers",OffersRouter)
app.use("/rooms",RoomsRouter)

export default app