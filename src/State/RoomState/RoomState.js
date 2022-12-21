import config from '../../config'
import responseService from "../../Services/responseService";

class RoomState{
    load = false
    rooms = []
    async getRoom(){
        try{
            if(this.load){
                return {warning:false, rooms:this.rooms, none:'123'}
            }else{
                const result = await responseService.responseApiServer(config.URL_GET_ROOMS, {})
                if(!result.warning){
                    this.rooms = result.rooms
                    this.load = true
                    return result
                }else{
                    return {warning:true, rooms:[]}
                }
            }
        }catch (e) {
            console.log(e)
            return {warning:true, rooms:[]}
        }
    }
}

export default new RoomState()