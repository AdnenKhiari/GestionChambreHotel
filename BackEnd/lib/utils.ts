import moment from "moment"
export const formate_date = (date : string) => moment(new Date(date)).format('DD/MM/YYYY')

