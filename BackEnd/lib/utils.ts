import moment from "moment"
export const formate_date = (date : string | Date) => moment(typeof(date) === "string" ? new Date(date) : date).format('DD/MM/YYYY')

export const formate_date_mod : (date : string | Date)  => string = (date) =>{
    let dt : string | null= null
    if(date instanceof Date)
        dt = moment(date).format("YYYY-MM-DD")
    else
        dt = date.split("-").reverse().join("-") as string

    return dt
} 
