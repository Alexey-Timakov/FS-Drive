import React, { useState, useEffect } from "react";

function UserLicIdDate ({addUserInfoToState}) {
    const STORE_TITLE = "userLicIdDate";
    const [userLicIdDate, userInputChange] = useState("2010-10-20");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userLicIdDate);
    })

    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="licensetDate">Дата выдачи</label>
                    <input className="block-input__licence-date short calendar" type="date" id="userLicIdDate" name="userLicIdDate" value={userLicIdDate} onChange={onValueChange} max="2999-12-31"/>
                </div>
            <p className="block-input__error">Некорректная дата</p>
            </div>
        </>
    )
} 

export default UserLicIdDate;