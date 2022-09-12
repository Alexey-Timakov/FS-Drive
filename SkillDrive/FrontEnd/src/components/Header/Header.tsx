import React from "react";

import Logo from "./Logo";
import TopMenu from "./TopMenu";
import TopMenuCompact from "./TopMenuCompact";

import "./Header.scss";

function Header () {
    return (
        <header>
            <Logo />
            <TopMenuCompact />
            <TopMenu />
        </header>
    )
}

export default Header;