import React, {useEffect, useState} from 'react';
import s from './QuizPage.module.css'
import config from "../../config";
import {useParams} from "react-router-dom";
import Loader from "../Static/Loader/Loader";
import NavBar from "../Static/NavBar/NavBar";
import FinishPage from "../FinishPage/FinishPage";
import ChangeScorePage from "./ChangeScorePage/ChangeScorePage";

const QuizPage = () => {
    const [isLoad, setIsLoad] = useState(false)
    const [ws, setWs] = useState({})
    const {room} = useParams()
    const [finalScore, setFinalScore] = useState({})
    const [title, setTitle] = useState('')
    const [currentTask, setCurrentTask] = useState(-1)
    const [isStart, setIsStart] = useState(false)
    const [question, setQuestion] = useState()
    const [teamsCode, setTeamsCode] = useState([])
    const [countPlayerAnswer, setCountPlayerAnswer] = useState({})
    const [countPlayerList, setCountPlayerList] = useState({})
    const [logAnswers, setLogAnswers] = useState({})
    const [score, setScore] = useState({})
    const [isNextRound, setIsNextRound] = useState(false)
    const [isFinishQuestion, setIsFinishQuestion] = useState(false)
    const [viewFinishPage, setIsViewFinishPage] = useState(false)
    const [isChangeScore, setIsChangeScore] = useState(false)

    const [time, setTime] = useState(-1)
    const [isTimerStart, setIsTimerStart] = useState(false)
    const [isTimerEnd, setIsTimerEnd] = useState(false)
    // const [isTimerPause, setIsTimerPause] = useState(false)

    // const init = async()=>{
    //
    // }
    const viewScore = ()=>{

        ws.send(JSON.stringify({action:'view_score', room}))
        console.log('view_score')
    }
    const start = ()=>{
        ws.send(JSON.stringify({action: 'start', type:'game', room}));
    }

    const finishQuiz = ()=>{
        console.log('finishQuiz')
        ws.send(JSON.stringify({action:'finish', room}))
    }
    const nextQuestion = ()=>{
        ws.send(JSON.stringify({action: 'next', room}));
    }

    const viewAnswer = ()=>{
        ws.send(JSON.stringify({action: 'view_answer', room}));
    }

    const timerStart = ()=>{
        ws.send(JSON.stringify({action: 'timer_start', type:'game', room}));
    }

    const timerStop = ()=>{
        ws.send(JSON.stringify({action: 'timer_stop', type:'game', room}));
    }

    const init = ()=>{
        const ws = new WebSocket(config.SERVER_SOCKET)
        ws.onopen = function () {
            console.log("подключился");
            ws.send(JSON.stringify({
                action: 'login',
                type: 'admin',
                room,
            }));
        };
        ws.onclose = ()=>{
            init()
        }
        ws.onmessage = function (message) {
            const data = JSON.parse(message.data)
            console.log("Message", data);
            switch (data.action) {
                case 'score':
                    if (data.stepRound === 'score')
                        setIsNextRound(true)
                    break
                case 'get_score':
                    if (data.stepRound === 'score')
                        setIsNextRound(true)
                    if (data.stepRound === 'finish'){
                        setIsViewFinishPage(true)
                        setFinalScore({teamsName:data.teamsName, score:data.score})
                        console.log('!!!@@@@@@@!!!!',{teamsName:data.room.teamsName, score:data.room.score})
                        console.log('!!!!!!!!step')
                    }
                    break
                case 'game':
                    if (data.stepRound === 'game')
                        setIsNextRound(false)

                    setIsTimerStart(data.isTimerStart)
                    setIsTimerEnd(data.isTimerEnd)
                    // setIsTimerPause(data.isTimerPause)
                    setTime(data.time)

                    setTitle(data.quiz.title)
                    setCurrentTask(data.currentTask)
                    setIsStart(data.isStart)
                    setIsFinishQuestion(data.question.isFinishQuestion)
                    setQuestion(data.question)


                    break

                case 'time':
                    setIsTimerStart(data.isTimerStart)
                    setIsTimerEnd(data.isTimerEnd)
                    // setIsTimerPause(data.isTimerPause)
                    setTime(data.time)
                    break

                case 'score_admin':
                    console.log('!!!!', data.room)
                    if (data.room.stepRound === 'score') {
                        setIsNextRound(true)

                    }
                    setCountPlayerAnswer(data.room.countPlayerAnswer)
                    setCountPlayerList(data.room.countsPlayerList)
                    setLogAnswers(data.room.logAnswers)
                    setScore(data.room.score)
                    setTeamsCode(data.room.teamsCode)

                    break
            }

            setIsLoad(true)
        };
        setWs(ws)
    }

    useEffect(() => {
        init()

    }, [])

    const saveScore = (newScore) =>{
        ws.send(JSON.stringify({action: 'set_score', score:newScore, room}));
    }

    if(isChangeScore)
        return (
            <>
                <NavBar/>
                <div className={s.btn_change_score} onClick={()=>setIsChangeScore(false)}>Назад</div>
                <ChangeScorePage saveScore={saveScore} teamsCode={teamsCode} score={score}/>
            </>
        )

    return isLoad ? (
        <>{viewFinishPage?
            <>
                <NavBar title={title}/>

                <FinishPage finalScore={finalScore}/>
                <div className={s.btn_close} onClick={()=>{
                    window.location.href = window.location.origin
                }}>{'Завершить'}</div>
            </>:
            <div className={s.wrapper}>
                <NavBar title={title}/>
                <div className={s.btn_close} onClick={()=>{
                    window.location.href = window.location.origin
                }}>{'<< Вернуться к выбору викторин'}</div>
                <div className={s.game_status}>
                    <div className={s.game_status_is_start}>{isStart ? <span className={s.game_status_start}>игра запущена</span> : <span className={s.game_status_stop}>игра остановлена</span>}</div>
                    <div className={s.game_status_round}><span>{currentTask + 1}</span><br/>раунд</div>
                </div>


                {isStart?
                    <>
                        <div className={s.question}>
                            {isTimerEnd?
                                <div className={s.timer_finish}>Время истекло</div>:
                                <div>
                                    <div className={s.timer}>Таймер: {time}</div>
                                    <div className={s.btn_timer} onClick={(e)=>{
                                        if (isTimerStart){
                                            timerStop()
                                        }else{
                                            timerStart()
                                        }
                                        e.target.innerText = "..."
                                    }}>{isTimerStart?"Стоп":"Старт"}</div>
                                </div>}
                            <div className={s.question_title}>Текущий вопрос</div>
                            <div className={s.question_text}>{question.text}</div>
                        </div>

                        <div className={s.answer}>ОТВЕТ: {question.answer}</div>
                        <div onClick={()=>{viewAnswer()}} className={s.btn_next}>Показать ответ</div>

                    </>:<></>}


                <div className={s.score}>
                    <div className={s.score_title}>Счет команд:</div>
                    <table>
                        <tbody>
                        <tr>
                            <td>команда</td>
                            <td>счет</td>
                        </tr>
                        {teamsCode ? teamsCode.map((team, index) => {
                            // console.log('score[team.teamCode]',score[team.teamCode])

                            return (
                                <tr className={s.row_team_score}key={'team_score_' + index}>
                                    <td className={s.td_team_name}>{team.teamName}</td>
                                    <td className={s.td_score}> {score[team.teamCode] && score[team.teamCode].current ? Math.round(score[team.teamCode].current) : 0}</td>
                                </tr>
                            )
                        }) : <tr></tr>}
                        </tbody>
                    </table>
                    <div onClick={()=>{setIsChangeScore(true)}} className={s.btn_change_score}>Изменить счет</div>
                </div>

                <div className={s.statistic_round}>
                    <div className={s.statistic_round_title}>Отчет по раунду:</div>
                    <table>
                        <tbody>
                        <tr>
                            <td>Название</td>
                            <td>игроков</td>
                            <td>ответило</td>
                            <td>верно/неверно</td>
                        </tr>
                        {teamsCode ? teamsCode.map((team, index) => {
                            return (

                                <tr key={'team_report_' + index} className={countPlayerList[team.teamCode] === countPlayerAnswer[team.teamCode]? s.equally_count:s.not_equally_count }>
                                    <td className={s.statistic_round_team_name}>{team.teamName}</td>
                                    <td>{countPlayerList && countPlayerList[team.teamCode] ? countPlayerList[team.teamCode] : 0}</td>
                                    <td>{countPlayerAnswer && countPlayerAnswer[team.teamCode] ? countPlayerAnswer[team.teamCode] : 0}</td>
                                    <td>{score[team.teamCode]?score[team.teamCode].right:0} / {score[team.teamCode]?score[team.teamCode].mistake:0}</td>
                                </tr>
                            )
                        }) : <tr></tr>}
                        </tbody>
                    </table>
                </div>
                <div className={s.answers_team}>
                    <div className={s.answers_team_title}>Ответы команд:</div>
                    <table>
                        <tbody>

                        {teamsCode ? teamsCode.map((team, index) => {
                            return (
                                <tr key={'team_report_answer' + index}>
                                    <td>{team.teamName}</td>
                                    <td>
                                        {logAnswers && logAnswers[currentTask] && logAnswers[currentTask][team.teamCode] ?
                                            logAnswers[currentTask][team.teamCode].length > 0 ?
                                                logAnswers[currentTask][team.teamCode].map((l, i) => {
                                                    console.log('l.asnwer', l)
                                                    return (
                                                        <div key={'log_' + index + i}>
                                                            {l.answer}
                                                        </div>
                                                    )
                                                }) : '-'
                                            :
                                            '-'
                                        }
                                    </td>
                                </tr>
                            )
                        }) : <tr></tr>}

                        </tbody>
                    </table>
                </div>
                {isStart?
                    <>

                        {isFinishQuestion?<>
                            {!isNextRound?<div onClick={()=>{viewScore()}} className={s.btn_next}>Показать результат</div>:
                                <div onClick={()=>{finishQuiz()}} className={s.btn_next}>Итоговый результат</div>}
                        </>:<>
                            {!isNextRound?
                                <div onClick={()=>{viewScore()}} className={s.btn_next}>Следующий вопрос</div>
                                :<>
                                    <div onClick={()=>{nextQuestion()}} className={s.btn_next}>Далее</div>
                                    <div onClick={()=>{finishQuiz()}} className={s.btn_exit_quiz_early}>Завершить досрочно</div>
                                </>
                            }

                        </>}
                    </>:<>
                        <div onClick={()=>{start()}} className={s.btn_next}>Старт</div>


                    </>}


            </div>}
        </>
    ) : (
        <Loader/>
    )
};

export default QuizPage;