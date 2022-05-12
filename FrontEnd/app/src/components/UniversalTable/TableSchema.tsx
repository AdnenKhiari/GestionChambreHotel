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