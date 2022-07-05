import React, { useState, useEffect } from "react";

function UserPassportEmitent ({addUserInfoToState}) {
    const STORE_TITLE = "userPassportEmitent";
    const [userPassportEmitent, userInputChange] = useState("ГОВД Такого-то города");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userPassportEmitent);
    })

    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="userPassportEmitent">Кем выдан</label>
                    <input className="block-input__passport-emit" type="text" id="userPassportEmitent" name="userPassportEmitent" value={userPassportEmitent} onChange={onValueChange} placeholder="Название органа выдавшего паспорт"/>
                </div>
            <p className="block-input__error">Некорректное значение</p>
            </div>
        </>
    )
    }

export default UserPassportEmitent;