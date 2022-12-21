import React from 'react';
import {Button, Modal} from "react-materialize";
import QrAuth from "./QrAuth";
import s from './qr_style.module.css'
import {QrReader} from "react-qr-reader";
const ModalWindowAuthByQr = (props) => {
    //console.log(props)
    return (
    <Modal
        actions={[
            <Button flat modal="close" node="button" waves="green">Отмена</Button>
        ]}
        bottomSheet={false}
        fixedFooter
        header="Наведите камеру на QR-код"
        id="modal_auth"
        open={false}
        options={{
            dismissible: true,
            endingTop: '10%',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: '4%'
        }}
    >
        <QrAuth isError={props.isError} errorAuthQr={props.errorAuthQr} actionLoginQr={props.actionLoginQr} />
         </Modal>
    );
};

export default ModalWindowAuthByQr;