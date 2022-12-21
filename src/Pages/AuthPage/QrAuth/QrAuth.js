import React, {useState} from 'react';
import {QrReader} from 'react-qr-reader'
import s from './qr_style.module.css'
import Loader from "../../../Static/Loader/Loader";
const QrAuth = (props) => {
    const [qrData, setQrData] = useState(false)
    const handleScan = async(data)=> {

        if (data) {
            setQrData(true)
            await props.actionLoginQr(data.text)
            console.log('отчет', data.text)
            setQrData(false)
            // {"login":"user1","pass":"1234"}
            // {"login":"user1","pass":"1234"}

        }
    }
    function handleError(err) {
        console.error(err)
    }
    return (
        <div className={props.isError?s.wrapper_qr_video_error:s.wrapper_qr_video}>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                onResult={handleScan}
            />
            {props.isError?<div className='red white-text'>Ошибка авторизации. Некорректный QR-код</div>:<></>}
            {qrData?<Loader/>:<></>}
        {/*</div>*/}
        </div>
    )

};

export default QrAuth;