import React, { useState, useEffect } from "react";

function UserName ({addUserInfoToState}) {
    const STORE_TITLE = "userName";
    const [userName, userInputChange] = useState("Юзер Тестович Ноунеймов");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userName);
    })
    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="userName">ФИО:</label>
                    <input className="block-input__name" type="text" id="userName" name="userName" value={userName} onChange={onValueChange} placeholder="ФИО полностью"/>
                </div>
                <p className="block-input__error">Некорректное имя</p>
            </div>
        </>
    )
}

export default UserName;