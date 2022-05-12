import React from "react"
import { useQuery } from "react-query"
export const useUrlParams = (name : string,baseurl : string)=>{
    const [queryUrl,setQueryUrl] : [URL,any]= React.useState(new URL(baseurl))
    const {isLoading,isError,data : payload,refetch} : {isLoading: boolean,isError: boolean,data:any,refetch : any} = useQuery([name , queryUrl.searchParams.toString()],()=>{
        return fetch(queryUrl.toString()).then((dt)=>dt.json())
    })
    const onValidate = (data : any)=>{
        Object.keys(data).forEach((key)=>{
            queryUrl.searchParams.set(key,data[key])
        })
        setQueryUrl(queryUrl)
        refetch()
    }
    return {
        queryUrl,
        isLoading,
        isError,
        onValidate,
        payload,
        refetch
    }
}

