import * as React from "react";

import "../images/arrow_down.svg";
import "../images/arrow_up.svg";

function QAElement (props) {
    return (
        <>
            <button className="quest-and-ans__button active">
                <span className="quest-and-ans__button-text">{props.question}</span>
                <img className="arrow_down" src="./images/arrow_down.svg" alt="" aria-hidden="true"/>
                <img className="arrow_up active" src="./images/arrow_up.svg" alt="" aria-hidden="true"/>
            </button>
            <div className="quest-and-ans__answ active">{props.answer}</div>
        </>
    )
}

export default QAElement;