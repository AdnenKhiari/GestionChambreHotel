const basePath = "http://localhost:4000/api";
const Routes = {
    CLIENTS : {
        INFO: basePath+'/clients/info',
        HISTORY: (id: any) =>basePath+'/clients/'+id+'/history',
        ADD : basePath+'/clients/',
        UPDATE : (id : any)=>basePath+'/clients/'+id,
        GETBYID : (id: any)=>basePath+'/clients/'+id,
        DELETE : basePath+'/clients/'
    },
    ROOMS : {
        INFO: basePath+'/rooms/info',
        ADD : basePath+'/rooms/',
        HISTORY: (id: any) =>basePath+'/rooms/'+id+'/history',
        UPDATE : (id : any)=>basePath+'/rooms/'+id,
        GETBYID : (id: any)=>basePath+'/rooms/'+id,
        DELETE : basePath+'/rooms/'
    },
    OFFERS : {
        INFO: basePath+'/offers/info',
        ADD : basePath+'/offers/',
        HISTORY: (id: any) =>basePath+'/offers/'+id+'/history',
        UPDATE : (id : any)=>basePath+'/offers/'+id,
        GETBYID : (id: any)=>basePath+'/offers/'+id,
        DELETE : basePath+'/offers/'
    },
    BOOKINGS : {
        INFO: basePath+'/bookings/info',
        ADD : basePath+'/bookings/',
        UPDATE : (id : any)=>basePath+'/bookings/'+id,
        GETBYID : (id: any)=>basePath+'/bookings/'+id,
        DELETE : basePath+'/bookings/'
    }
}
export default Routes