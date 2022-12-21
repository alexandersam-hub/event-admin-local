import React from 'react';
import svg from './loader.svg'
import s from './loader.module.css'

const Loader = () => {
    return (
        <div className={s.loaderElement}>
            <img src={svg} alt=""/>
        </div>
    );
};

export default Loader;