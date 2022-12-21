import React, {useEffect, useState} from 'react';
import s from './FinishPage.module.css'
const FinishPage = ({finalScore}) => {
    const [result, setResult] = useState([])
    useEffect(()=>{
        let place = 1
        let currentScore
        if (finalScore&&finalScore.score&&finalScore.teamsName){
            const newListTeamsScore = []
            finalScore.teamsName.forEach((team,index)=>{
                newListTeamsScore.push({team,score:finalScore.score[index], place:0})
            })

            newListTeamsScore.sort((a,b)=> b.score - a.score)
            currentScore = newListTeamsScore[0].score
            newListTeamsScore.forEach(team=>{
                if(team.score<currentScore)
                    place++
                team.place = place
            })
            setResult(newListTeamsScore)
        }
    },[])
    return (
        <div className={s.wrapper}>
            <div className={s.title}>Результаты игры</div>
            {result.length>0?
                <table className={s.t_score}>
                    <tbody>
                    <tr>
                        <td className={s.t_title}>место</td>
                        <td className={s.t_title}>название команды</td>
                        <td className={s.t_title}>счет игры</td>
                    </tr>
                    {result.map((res, index)=>{
                        return(
                            <tr key={'result_team_'+index}>
                                <td>{res.place} место</td>
                                <td>{res.team}</td>
                                <td>{res.score}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>:<></>
            }
        </div>
    );
};

export default FinishPage;