class ApiError extends Error {

    payload : any;
    status_code : number;

    constructor(message : string,payload: any,status_code: number){
        super(message)
        this.payload = payload
        this.status_code = status_code
    }

}
export default ApiError