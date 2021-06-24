import * as React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";

function TopMenuUnreg () {
    return (
        <div className="menu-right">
        <nav className="menu-right__nav">
            <div><Link to="/about" aria-label="О нас">О нас</Link></div>
            <div><Link to="">Условия</Link></div>
            <div><Link to="/faq" aria-label="Частые вопросы">Частые вопросы</Link></div>
        </nav>
        <button className="menu-right__button">Войти</button>
    </div>
    )
}

export default TopMenuUnreg;