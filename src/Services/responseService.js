import config from "../config";
import Cookies from 'js-cookie';

class ResponseService{
   async responseApiServer(to, data={}){

        const token = Cookies.get('token')
        //console.log( window.location.origin);
        if(!token){
      
        }
        data.token = token
        console.log(config.URL_API+to, data)
       const response = await fetch(config.URL_API+to,{
           method:'POST',
           headers: {
               'Content-Type': 'application/json;charset=utf-8',
           },
           body: JSON.stringify(data)
       })
       const result = await response.json()

       if(result.badToken){
            // Cookies.remove('token')
            window.location.replace( window.location.origin)
       }
       if(result.badPage){
            window.location.replace( window.location.origin)
       }
       return result
   }
}

export default new ResponseService()