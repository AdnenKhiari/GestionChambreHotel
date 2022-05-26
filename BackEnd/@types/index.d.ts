interface Client {
    id?: number,
    fullname?: string,
    job?: string | null,
    cin?: string,
    date_of_birth?: Date | string | undefined,
    address?: string | null,
    state?: 'M' | 'D' | 'S'
    gender? : 'M'| 'F'
}
interface Offer {
    id?: number,
    price?: number,
    name?: string,
    description?: string,
    date_start?: Date | string | undefined,
    date_end?: Date | string | undefined | null,
}

interface Room {
    id?: number,
    room_number?: number,
    capacity?: 'D' | 'T' | 'S' | 'Q',
    type?: 'R' | 'S',
    options?: 'D' | 'P' | 'S',
    state?: 'F' | 'O' | 'M' | 'C',
}

interface ClientSearch extends Client {
    pagenum?: number
}

interface OfferSearch extends Offer {
    pagenum?: number
}

interface RoomSearch extends Room {
    pagenum?: number
}

interface PaginatedArr {
    data: any[][] | undefined,
    searchCount: number
}

