import React from 'react';
import s from './roomCard.module.css'
import {Link} from 'react-router-dom'
import QuizPage from "../../QuizPage/QuizPage";

const RoomCard = ({room}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.title}>{room.quiz.title}</div>
            <div className={s.content}>
                <div>Количество игроков: <span>{room.countTeam}</span></div>
                <div>Описание: <span>{room.description}</span></div>
                <div>Название команд: </div>
                <div>
                    {
                        room.teamsName.map((team, index)=>{
                            return(
                                <div key={'team_name'+index}>{index+1}) {team}</div>
                            )
                        })
                    }
                </div>
            </div>

            <Link to={'./'+room.id}>
                <div className={s.btn_go}>Перейти</div>
            </Link>
        </div>
    );
};

export default RoomCard;