import React, {useEffect, useState} from 'react';
import s from './GamePage.module.css'
import RoomState from "../../State/RoomState/RoomState";
import Loader from "../Static/Loader/Loader";
import RoomCard from "./roomCard/RoomCard";
import NavBar from "../Static/NavBar/NavBar";

const GamePage = () => {
    const [rooms, setRooms] = useState([])
    const [warning, setWarning] = useState(false)
    const [quizzes, setQuizzes] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const init=async()=>{
        const resultRoom = await RoomState.getRoom()
        // console.log(resultQuizzes)
        if (!resultRoom.warning) {
            setRooms(resultRoom.rooms)
            setIsLoad(true)
        }
        else
            setTimeout(()=>init(), 1200)
    }
    useEffect(()=>{
        init()
    },[])
    return isLoad?(
        <div>
            <NavBar/>
            {rooms.length>0?
            <div>
                {rooms.map((room,index)=>{
                    return(
                        <RoomCard key={'room_card_'+index} room={room}/>
                    )
                })}
            </div>:<div>
                    Нет созданных виртуальных комнат
                </div>}
        </div>
    ):(
        <>
            <NavBar/>
            <Loader/>
        </>
    )
};

export default GamePage;