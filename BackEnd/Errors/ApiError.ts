interface IError {
    name?: string,
    messsage: string
    payload?: any
}
class ApiError extends Error {

    payload : any;
    status_code : number;
    constructor(message : string,payload: any,status_code: number){
        super(message)
        this.payload = payload
        this.status_code = status_code
    }

    format_for_response () : IError { 
        return {name: this.name,messsage: this.message,payload: this.payload}
    }

}
export default ApiError