import * as React from "react";

import Logo from "./logo";
import TopMenu from "./top_menu";
import TopMenuCompact from "./top_menu_compact";

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