import axios from "axios"
import React from "react"
import { useQuery } from "react-query"
import { IUseQuery } from "../../types"
type QueryParamsGet = (
    name : string,
    baseurl : string
)  => IUseQuery.IQueryResult 

export const useUrlParams : QueryParamsGet  = (name : string,baseurl : string) => {
    const [queryParams,setQueryParams] = React.useState<any>(null)
    const {isLoading,isError,data : payload,refetch} = useQuery([name , queryParams ],()=>{
        return axios.get(baseurl,{withCredentials: true,params: queryParams}).then((dt)=>dt.data)
    })
    const onValidate = (data : any)=>{
        setQueryParams(data)
        refetch()
    }
    return {
        isLoading,
        isError,
        onValidate,
        payload,
        refetch
    }
}

