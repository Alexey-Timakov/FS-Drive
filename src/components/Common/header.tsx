import * as React from "react";

import Logo from "./logo";
import TopMenuUnreg from "./top_menu_unreg";
import TopMenuCompactUnreg from "./top_menu_compact_unreg";

function Header () {
    return (
        <header>
            <Logo />
            <TopMenuCompactUnreg />
            <TopMenuUnreg />
        </header>
    )
}

export default Header;