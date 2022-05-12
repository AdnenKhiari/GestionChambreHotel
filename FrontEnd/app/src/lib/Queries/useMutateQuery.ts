import { useMutation, useQueryClient } from "react-query"
export const useMutateQuery = (baseurl : string,method: "POST" | "PATCH" | "DELETE",success? : (data : any)=>any,queriesToInvalidate?: any[])=>{
    const client = useQueryClient() 
    const {isLoading,isError,isSuccess,data : payload,mutate} : {isLoading: boolean,isSuccess: boolean,isError: boolean,data:any,mutate : any} = useMutation((dataPost)=>{
        return fetch(baseurl,{
            method: method,
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(dataPost)
        }).then((dt)=>dt.json())
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
