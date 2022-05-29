import moment from "moment"

export const getRoomCapacity  :(type : 'S' | 'D' | 'T' | 'Q'  ) => string  | undefined = (type)=> {
    if(type === 'S')
        return 'Single'
    if(type === 'D')
        return 'Double'
    if(type === 'T')
        return 'Triple'
    if(type === 'Q')
        return 'Quadruple'
}
export const getRoomType  :(type : ('R' | 'S')) => string  | undefined = (type)=> {
    if(type === 'R')
        return 'Room'
    if(type === 'S')
        return 'Suite'
}
export const getRoomOptions :(type : 'D' | 'P' | 'S') => string  | undefined = (type)=> {
    if(type === 'D')
        return 'Default view'
    if(type === 'P')
        return 'Pool view'
    if(type === 'S')
        return 'Sea view'
}
export const getRoomState  :(type : 'F' | 'O' | 'M' | 'C') => string  | undefined = (type)=> {
    if(type === 'F')
        return 'Free'
    if(type === 'O')
        return 'Occupied'
    if(type === 'M')
        return 'Maitenance'
    if(type === 'C')
        return 'Closed'
}

export const format_date = (date: Date | string,format = "MM-DD-YYYY")=>{
    return moment(date).format(format)
}