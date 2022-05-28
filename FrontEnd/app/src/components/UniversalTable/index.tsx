import TableSearch from "./TableSearch"
import TableContent from "./TableContent"
import { IUniversalTable  } from "../../types"
import {ObjectPropertiesSchema} from "joi"
import {useUrlParams} from "../../lib/Queries/useUrlParams"
import { motion } from "framer-motion"
import { Slide } from "../../lib/Animations"
interface IUnitableParams{
     queryname: string,
     querypath: string,
     title : string,
     searchData : IUniversalTable.IsearchData[],
     schema : ObjectPropertiesSchema,
     datatable : (data : any)=> IUniversalTable.ItableData,
     onRowClick? : any,
     paginate?: boolean
}
const UniversalTable : React.FC<IUnitableParams> = ({queryname,querypath,title,searchData,schema,datatable,onRowClick,paginate = false})=>{

    const { onValidate ,isLoading,isError,payload} = useUrlParams(queryname,querypath)

    return <motion.div className="uniTable" variants={Slide} animate="animate" initial="initial" exit="exit" >
         <div>
         <h2><span className="border"></span>{title}</h2>
         <TableSearch  paginate={paginate} onValidate={onValidate} searchData={searchData} schema={schema} />
         </div>
         {isLoading && <h1>Loading...</h1> }
         {!isLoading && isError && <h1>Error !</h1> }
         {!isError && !isLoading && payload  && <TableContent tableData={datatable(payload.data)} onclick={onRowClick ? onRowClick : (dt : any)=>console.log(dt)}/>}
     </motion.div>
}
export default UniversalTable