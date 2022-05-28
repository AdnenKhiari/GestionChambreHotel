import axios from "axios"
import React from "react"
import { useQuery } from "react-query"
import { IUseQuery } from "../../types"
type QueryParamsGet = (
    name : string,
    baseurl : string
)  => IUseQuery.IQueryResult 

export const useUrlParams : QueryParamsGet  = (name : string,baseurl : string) => {
    const [queryUrl,setQueryUrl] = React.useState<URL>(new URL(baseurl))
    const {isLoading,isError,data : payload,refetch} = useQuery([name , queryUrl.searchParams.toString()],()=>{
        return axios.get(queryUrl.toString(),{withCredentials: true}).then((dt)=>dt.data)
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

