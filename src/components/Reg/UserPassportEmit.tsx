import React, { useState, useEffect } from "react";

function UserPassportEmit ({addUserInfoToState}) {
    const STORE_TITLE = "userPassportEmit";
    const [userPassportEmit, userInputChange] = useState("");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userPassportEmit);
    })

    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="userPassportEmit">Кем выдан</label>
                    <input className="block-input__passport-emit" type="text" id="userPassportEmit" name="userPassportEmit" value={userPassportEmit} onChange={onValueChange} placeholder="Название органа выдавшего паспорт"/>
                </div>
            <p className="block-input__error">Некорректное значение</p>
            </div>
        </>
    )
    }

export default UserPassportEmit;