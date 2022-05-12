import TableSearch from "./TableSearch"
import TableContent from "./TableContent"
import {IsearchData,ItableData} from "./TableSchema"
import {ObjectPropertiesSchema} from "joi"
import {useUrlParams} from "../../lib/Queries/useUrlParams"

const UniversalTable = ({queryname,querypath,title,searchData,schema,datatable,onRowClick,paginate = false} : {queryname: string,querypath: string,title : string,searchData : IsearchData[],schema : ObjectPropertiesSchema,datatable : (data : any)=> ItableData,onRowClick? : any,paginate?: boolean})=>{
   /* return <div className="uniTable" >
        <div>
        <h2><span className="border"></span>{title}</h2>
        <TableSearch  paginate={paginate} onValidate={onValidate} searchData={searchData} schema={schema} />
        </div>
        <TableContent tableData={data} onclick={onRowClick ? onRowClick : (dt : any)=>console.log(dt)}/>
    </div>*/
    const { onValidate ,isLoading,isError,payload} = useUrlParams(queryname,querypath)
    return <div className="uniTable" >
         <div>
         <h2><span className="border"></span>{title}</h2>
         <TableSearch  paginate={paginate} onValidate={onValidate} searchData={searchData} schema={schema} />
         </div>
         {isLoading && <h1>Loading...</h1> }
         {!isLoading && isError && <h1>Error !</h1> }
         {!isError && !isLoading && payload  && <TableContent tableData={datatable(payload.data)} onclick={onRowClick ? onRowClick : (dt : any)=>console.log(dt)}/>}
     </div>
}
export default UniversalTable