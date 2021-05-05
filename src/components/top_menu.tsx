import * as React from "react";

function TopMenu () {
    return (
        <div className="menu-right">
        <nav className="menu-right__nav">
            <div><a href="./about.html" aria-label="О нас">О нас</a></div>
            <div><a href="">Условия</a></div>
            <div><a href="./faq.html" aria-label="Частые вопросы">Частые вопросы</a></div>
        </nav>
        <button className="menu-right__button">Войти</button>
    </div>
    )
}

export default TopMenu;