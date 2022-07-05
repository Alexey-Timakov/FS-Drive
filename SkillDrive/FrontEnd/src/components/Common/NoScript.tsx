import React from "react";

function NoScript () {
    let styles = {
        textAlign: "center" as "center",
        fontSize: "20px",
        color: "red",
        
    };
    return (
        <noscript style={styles}><p>Для полноценной работы сайта необходимо в настройках браузера активировать JavaScript!</p></noscript>
    )
}

export default NoScript;