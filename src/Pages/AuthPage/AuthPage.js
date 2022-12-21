import React, {useState} from 'react';
import authState from '../../State/AuthState/AuthState'
import s from './authPage.module.css'
import NavBar from "../Static/NavBar/NavBar";
import Cookie from 'js-cookie'

const AuthPage =() => {
    const [login,setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)
    const loginFunc = async ()=>{
        const res = await authState.login(login, password)
        if (res.warning){
            setIsError(true)
        }else{
            Cookie.set('token', res.data.token)
            window.location.href = window.location.origin
        }
        console.log(res)
    }
    return (
        <>
            <NavBar/>
                <div className={s.wrapper}>
                <div className={s.form}>
                    <div className={s.title}>Авторизация</div>
                    <div className={s.text_box_wrapper}>
                            <input
                                onChange={(e)=>{setLogin(e.target.value)}}
                                id="login"
                                type="text"
                                placeholder='Имя пользователя'
                                className={s.text_box}/>
                            
                    </div>
                    <div className={s.text_box_wrapper}>
                            <input
                                onChange={(e)=>{setPassword(e.target.value)}}
                                id="password"
                                type={"password"}
                                placeholder='Пароль'
                                className={s.text_box}/>
                    </div>
                    {isError?
                        <div className={s.error_row}>
                           {'Неверный логин или пароль'}
                        </div>:
                        <div  className={s.error_row_emty}></div>
                    }
                    <div className={s.button_enter} onClick={()=>loginFunc()}>Войти</div>
                    {/* <div className='btn center modal-trigger ' href="#modal_auth">Авторизация по QR</div> */}
                </div>
                </div>
            {/* <ModalWindowAuthByQr isError={authState.isError} actionLoginQr={actionLoginQr} errorAuthQr={errorAuthQr}/> */}
            </>
    );
}

export default AuthPage;