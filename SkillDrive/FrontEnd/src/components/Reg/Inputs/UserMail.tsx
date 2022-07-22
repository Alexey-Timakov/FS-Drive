import React, { useState, useEffect } from "react";

function UserMail ({addUserInfoToState}) {
    const STORE_TITLE = "userMail";
    const [userMail, userInputChange] = useState("avtimakov70@gmail.com");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userMail);
    })

    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="userMail">Электронная почта</label>
                    <input className="block-input__email" type="text" id="userMail" name="userMail" value={userMail} onChange={onValueChange} placeholder="mail@example.com"/>
                </div>
            <p className="block-input__error">Некорректная почта</p>
            </div>
        </>
    )
}
export default UserMail;