const basePath = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL
const Routes = {
    USERS : {
        LOGOUT: basePath+'/auth/logout',
        GETLOGGED: basePath+'/auth/logged',
        INFO: basePath+'/auth/info',
        LOGIN: basePath+'/auth/login',
        ADD : basePath+'/auth/singup',
        UPDATE : (id : any)=>basePath+'/auth/'+id,
        GETBYID : (id: any)=>basePath+'/auth/'+id,
        DELETE : basePath+'/clients/'
    },
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