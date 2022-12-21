import React from 'react';
import s from './NavBar.module.css'

const NavBar = ({title}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.logo}>
                <div className={s.logo_up}>интерактивная команданая игра</div>
                <div className={s.logo_down}>РОССИЯ В ДЕТАЛЯХ</div>
            </div>

            <div className={s.title}>{title}</div>
        </div>
    );
};

export default NavBar;