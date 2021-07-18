import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import CheckMailAfterResetPass from "./CheckMailAfterResetPass";
import Login from "./Login.jsx";
// import ResetPass from "./ResetPass.jsx";
import ResetPass from "../../Containers/ResetPass";

function TopMenuUnreg () {
    const showLoginWindow = () => {
        document.querySelector(".login-window__wrapper").classList.add("active");
        document.querySelector(".login-window__fade").classList.add("active");
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
        <CheckMailAfterResetPass />
        </>
    )
}

export default TopMenuUnreg;