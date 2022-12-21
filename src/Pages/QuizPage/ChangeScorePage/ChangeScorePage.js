import React, {useEffect, useState} from 'react';
import s from './ChangeScorePage.module.css'

const ChangeScorePage = ({teamsCode, score, saveScore}) => {
    const [newScore, setNewScore] = useState([])
    useEffect(()=>{
        const scoreArray = []
        teamsCode.forEach((team) => {
            const scoreList = {}
            scoreList.teamCode = team.teamCode
            scoreList.teamName = team.teamName
            scoreList.score = score[team.teamCode] && score[team.teamCode].last ? Math.round(score[team.teamCode].last) : 0
            scoreArray.push(scoreList)
        })
        setNewScore(scoreArray)
    },[])
    const changeScore = (index, value)=>{
        newScore[index].score = newScore[index].score+value
        setNewScore([...newScore])
    }
    return (

            <div className={s.wrapper}>

                <div className={s.title}>Счет команд:</div>

                    {newScore.length>0 ? newScore.map((team, index) => {
                        return (
                            <div key={'team_score_redact_' + index}>
                                <div>Команда: {team.teamName}</div>
                                <div>
                                    <span className={s.btn_add_score} onClick={()=>changeScore(index, -5)}>-5</span>
                                    <span className={s.btn_add_score} onClick={()=>changeScore(index, -1)}>-1</span>
                                        <span className={s.value_score}>{team.score}</span>
                                    <span className={s.btn_add_score} onClick={()=>changeScore(index, +1)}>+1</span>
                                    <span className={s.btn_add_score} onClick={()=>changeScore(index, +5)}>+5</span></div>
                            </div>
                        )
                    }) : <></>}
                    <div onClick={(e)=> {
                        saveScore(newScore)
                        e.target.textContent = 'Сохранено'
                        setTimeout(()=>{e.target.textContent = 'Сохранить'},1200)
                    }} className={s.btn_save_score}>Сохранить</div>
            </div>
    );
};

export default ChangeScorePage;