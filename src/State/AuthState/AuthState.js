import responseService from "../../Services/responseService";
import config from "../../config";

class AuthState{
    async login(username, password){
        try{
            const result = await responseService.responseApiServer(config.URL_LOGIN, {username, password})
            console.log(result)
            return result
        }catch (e) {
            return {warning:true, message:'нет соединенния с сервером'}
        }

    }
}

export default new AuthState()