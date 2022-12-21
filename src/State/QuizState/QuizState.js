import config from '../../config'
import responseService from "../../Services/responseService";

class QuizState{

    load = false
    quizzes = []

    async getQuizzes(){
        try{
            // const result = await responseService.responseApiServer(config.URL_GET_QUIZ, {})
            // if(this.load){
            //     return {warning:false, quizzes:this.quizzes}
            // }else{
            //     const result = await responseService.responseApiServer(config.URL_GET_QUIZ, {})
            //     console.log(result)
            //     if(!result.warning){
            //         this.quizzes = result.quizzes
            //         this.load = true
            //         return result
            //     }else{
            //         return {warning:true, quizzes:[]}
            //     }
            // }
        }catch (e) {
            console.log(e)
            return {warning:true, quizzes:[]}
        }
    }
}

export default new QuizState()