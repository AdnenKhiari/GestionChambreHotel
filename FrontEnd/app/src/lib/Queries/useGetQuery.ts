import { useQuery } from "react-query"
export const useGetQuery = (name : any[],baseurl : string,onSuccess?: any,onError?: any,isenabled? : Boolean )=>{

    const {isLoading,isError,data : payload,refetch} : {isLoading: boolean,isError: boolean,data:any,refetch : any} = useQuery(name ,()=>{
        return fetch(baseurl,{
            credentials: 'include',
        }).then((dt)=>dt.json())
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
