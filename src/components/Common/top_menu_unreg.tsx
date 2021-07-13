import * as React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import Login from "./Login.jsx";
import ResetPass from "./ResetPass.jsx";

function TopMenuUnreg () {
    const showLoginWindow = () => {
        document.querySelector(".login-window__wrapper").classList.add("is-active");
        document.querySelector(".login-window__fade").classList.add("is-active");
    }

    return (
        <>
        <div className="menu-right">
            <nav className="menu-right__nav">
                <div><Link to="/about" aria-label="О нас">О нас</Link></div>
                <div><Link to="">Условия</Link></div>
                <div><Link to="/faq" aria-label="Частые вопросы">Частые вопросы</Link></div>
            </nav>
            <button className="menu-right__button" onClick={showLoginWindow}>Войти</button>
        </div>
        <Login />
        <ResetPass />
        </>
    )
}

export default TopMenuUnreg;