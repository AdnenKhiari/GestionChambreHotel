import { useQuery } from "react-query"
import axios from "axios"
export const useGetQuery = (name : any[],baseurl : string,onSuccess?: any,onError?: any,isenabled? : Boolean )=>{

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
