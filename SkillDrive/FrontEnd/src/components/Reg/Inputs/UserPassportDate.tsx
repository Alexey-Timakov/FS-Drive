import React, { useState, useEffect } from "react";

function UserPassportDate ({addUserInfoToState}) {
    const STORE_TITLE = "userPassportDate";
    const [userPassportDate, userInputChange] = useState("2000-10-01");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userPassportDate);
    })

    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="userPassportDate">Дата выдачи</label>
                    <input className="block-input__passport-date short calendar" type="date" id="userPassportDate" name="userPassportDate" value={userPassportDate} onChange={onValueChange} max="2999-12-31"/>
                </div>
            <p className="block-input__error">Некорректная дата</p>
            </div>
        </>
    )
}

export default UserPassportDate;