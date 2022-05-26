import moment from "moment"
export const formate_date = (date : string | Date) => moment(typeof(date) === "string" ? new Date(date) : date).format('DD/MM/YYYY')

