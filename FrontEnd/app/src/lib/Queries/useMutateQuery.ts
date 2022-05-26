import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
export const useMutateQuery = (baseurl : string,method: "POST" | "PATCH" | "DELETE",success? : (data : any)=>any,queriesToInvalidate?: any[])=>{
    const client = useQueryClient() 
    const {isLoading,isError,isSuccess,data : payload,mutate} : {isLoading: boolean,isSuccess: boolean,isError: boolean,data:any,mutate : any} = useMutation((dataPost)=>{
        return axios.request({
            baseURL: baseurl,
            method: method,
            withCredentials: true,
            headers :  {
            'Content-type' : 'application/json'
            },
            data : dataPost
        },
        ).then((dt)=>dt.data)
    },{
        onSuccess : (receiveddata)=>{
            if(queriesToInvalidate !== undefined){
                queriesToInvalidate.forEach((qn)=>{
                    console.log(qn)
                    client.resetQueries(qn)
                })
            }
            if(success !== undefined)
                success(receiveddata)
        }

    })

    return {
        isLoading,
        isError,
        isSuccess,
        payload,
        mutate
    }
}
