export interface Client {
    id?: number,
    fullname?: string,
    job?: string | null,
    cin?: string,
    date_of_birth?: Date | string | undefined,
    address?: string | null,
    state?: 'M' | 'D' 
    gender? : 'M'| 'F'
}
export interface ClientSearch extends Client {
    pagenum?: number
}