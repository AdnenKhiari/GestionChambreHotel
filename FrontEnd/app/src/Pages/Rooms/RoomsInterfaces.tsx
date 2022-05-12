export default interface roomData  {
    [key: string]: any,
    id: number,
    room_number: string,
    capacity: 'D'| 'T'| 'S'| 'Q',
    type: 'R'| 'S',
    options: 'D'| 'P'| 'S',
    state: 'F'| 'O'| 'M' | 'C'
} 