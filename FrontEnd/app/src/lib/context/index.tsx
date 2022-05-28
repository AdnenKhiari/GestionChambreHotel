import { createContext } from "react";
import { RoomBookingType, User } from "../../types";

export const UserContext = createContext<{userInfo: User,setUserInfo: any} | null>(null)
export const BookingContext = createContext<null | {selectedIndexRoom : number,setSelectedIndexRoom: React.Dispatch<React.SetStateAction<number>> , setComState : React.Dispatch<React.SetStateAction<RoomBookingType>>}>(null)
