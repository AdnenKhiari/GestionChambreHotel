import { URL } from "url"

export interface User{
    id?: number,
    fullname?: string,
    email?: string
}
export  interface clientsData  {
    [key: string]: any,
    here : boolean,
    id: number,
    fullname: string,
    cin: string,
    address: string,
    date_of_birth: string,
    job?: string,
    gender: string,
    state:string
} 


export namespace IMenu {
    export interface ITmenuItem  { 
        item : string,
        imgSrc? : string,
        link? : string,
        subitem? : ITmenuItem[]
    }
    export interface ITmenuItemParams  { 
        imgSrc : string | null,
        itemTitle : string,
        children? : ITmenuItem[],
        link: string | undefined
    }
}
export namespace IUseQuery {
    export interface IMutateResult {
        isLoading: boolean,
        isError:boolean,
        isSuccess:boolean,
        payload:any,
        mutate: any
    }


    export interface IQueryResult {
        isLoading: boolean,
        isError:boolean,
        payload:any,
        queryUrl?: URL,
        onValidate?: (data: any) => any,
        refetch: () => any
    }

} 
export type RoomBookingType = 'SR' | 'SC' | 'R'  | 'SO' | 'SC'
export interface offerData  {
    [key: string]: any,
    id: number,
    name: string,
    description: string,
    date_start: string,
    date_end?: string | null,
} 


export namespace IUniversalTable {


    export interface IsearchData {
        name: string,
        label: string
        type: "text" | "email" | "number" | "date" | "select",
        nullable?: Boolean,
        selectOptions? : {value : string,label: string}[]
    }
    
    
    export interface ItableData {
        header: string[],
        body: any[][] | null
    }
}

export namespace IUniversalForm{
    export interface IformData {
        name: string,
        label: string
        type: "text" | "email" | "number" | "date" | "select"
        selectOptions? : {value : string,label: string}[]
    }
}
export  interface bookingSearchData  {
    [key: string]: any,
    id: number,
    name: string,
    date_checkin: string,
    date_checkout: string,
} 
export interface bkroomData {

    ROOM_ID?: string,
    ROOM_NUMBER: string,
    ROOM_CAPACITY: string,
    ROOM_TYPE: string,
    ROOM_OPTION: string,
    FOOD_CHOICE: "AI"|"SI"|"F"|"H"|"N",
    OFFER_ID: string,

    CLIENTS: number[]
}
export  interface bookingsData  {
    ID?: number,
    BOOKING_NAME: string,
    DATE_CHECKIN: string,
    DATE_CHECKOUT: string,
    ROOMS : roomData[]
} 

export interface roomData  {
    [key: string]: any,
    id: number,
    room_number: string,
    capacity: 'D'| 'T'| 'S'| 'Q',
    type: 'R'| 'S',
    options: 'D'| 'P'| 'S',
    state: 'F'| 'O'| 'M' | 'C'
} 