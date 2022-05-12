export  interface bookingSearchData  {
    [key: string]: any,
    id: number,
    name: string,
    date_checkin: string,
    date_checkout: string,
} 
export interface roomData {

    ROOM_ID: string,
    ROOM_NUMBER: string,
    ROOM_CAPACITY: string,
    ROOM_TYPE: string,
    ROOM_OPTION: string,
    FOOD_CHOICE: "AI"|"SI"|"F"|"H"|"N",
    OFFER_ID: string,

    CLIENTS: number[]
}
export  interface bookingsData  {
    name: string,
    date_checkin: string,
    date_checkout: string,
    rooms : roomData[]
} 
