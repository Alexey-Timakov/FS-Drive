import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";

import "./images/menu_compact.svg";
import "./images/close_cross.svg";

import Logo from "./Logo";

function TopMenuCompactUnreg () {

    const hideCompactMenu = () => {
        document.querySelector(".menu-right__compact-wrapper").classList.remove("active");
    }

    const showCompactMenu = (event) => {
        event.preventDefault();
        document.querySelector(".menu-right__compact-wrapper").classList.add("active");
    }

    const showLoginWindow = () => {
        hideCompactMenu();
        document.querySelector(".login-window__wrapper").classList.add("active");
        document.querySelector(".login-window__fade").classList.add("active");
    }

    return (
        <>
        <a className="menu-right__compact" href="" aria-label="Меню сайта" onClick={showCompactMenu}><img src="./menu_compact.svg" alt="Меню сайта" title="Меню"/></a>
        <div className="menu-right__compact-wrapper">
            <div className="menu-right__compact-header">
                <Logo />
                <div className="menu-right__compact-close">
                    <a onClick={hideCompactMenu} target="_blank" aria-label="Закрыть меню"><img src="./close_cross.svg" alt="" aria-hidden="true" title="Закрыть меню"/></a>
                </div>
            </div>
            <div className="menu-right__compact-links">
                <div className="link"><Link to="/about" aria-label="О нас" onClick={hideCompactMenu}>О нас</Link></div>
                <div className="link"><Link to="" onClick={hideCompactMenu}>Условия</Link></div>
                <div className="link"><Link to="/faq" aria-label="Частые вопросы" onClick={hideCompactMenu}>Частые вопросы</Link></div>
            </div>
            <div className="menu-right__compact-footer">
                <button className="compact-button" onClick={showLoginWindow}>Войти</button>
            </div>
        </div>
        </>
    )
}

export default TopMenuCompactUnreg;