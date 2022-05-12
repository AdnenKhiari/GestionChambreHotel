import { useQuery } from "react-query"
export const useGetQuery = (name : any[],baseurl : string)=>{

    const {isLoading,isError,data : payload,refetch} : {isLoading: boolean,isError: boolean,data:any,refetch : any} = useQuery(name ,()=>{
        return fetch(baseurl).then((dt)=>dt.json())
    })

    return {
        isLoading,
        isError,
        payload,
        refetch
    }
}
