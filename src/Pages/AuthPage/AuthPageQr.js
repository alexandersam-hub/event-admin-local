import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import Loader from "../../Static/Loader/Loader";
import NavBarChoiceQuiz from "../Static/NavBarChoiceQuiz";
import authState from "../../State/AuthState/AuthState";
import {observer} from "mobx-react-lite";

const AuthPageQr = (observer(() => {
    const {token} = useParams();
    //console.log('Token')
    useEffect(()=>{
        authState.login_qr(token)
    },)

    return (
        <div>
            <NavBarChoiceQuiz/>
            {authState.isError?
                <div>QR не удалось считать</div>:
                <Loader/>
            }

        </div>
    );
}))

export default AuthPageQr;