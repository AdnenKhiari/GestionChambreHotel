import { useQuery } from "react-query"
import axios from "axios"
import { IUseQuery } from "../../types"

type QueryGet = (name : any[],baseurl : string,onSuccess?: any,onError?: any,isenabled? : Boolean )=> IUseQuery.IQueryResult 

export const useGetQuery  : QueryGet = (name,baseurl,onSuccess,onError,isenabled)=>{

    const {isLoading,isError,data : payload,refetch} : {isLoading: boolean,isError: boolean,data:any,refetch : any} = useQuery(name ,()=>{
        return axios.get(baseurl,{withCredentials: true}).then((dt)=>dt.data)
    },{
        onSuccess: onSuccess,
        onError: onError,
        retry: 0,
        enabled: isenabled  === undefined ? true : (isenabled ? true : false )
    })

    return {
        isLoading,
        isError,
        payload,
        refetch
    }
}
