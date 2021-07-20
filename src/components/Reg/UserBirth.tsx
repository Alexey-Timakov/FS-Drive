import React, { useState, useEffect } from "react";

function UserBirth ({addUserInfoToState}) {
    const STORE_TITLE = "userBirth";
    const [userBirth, userInputChange] = useState("");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userBirth);
    })

    return (
            <>
                <div className="block-input__wrapper">
                    <div className="block-input__input">
                        <label htmlFor="userBirth">Дата рождения</label>
                        <input className="block-input__date short calendar" type="date" id="userBirth" name="userBirth" value={userBirth} onChange={onValueChange} max="2999-12-31"/>
                    </div>
                    <p className="block-input__error">Некорректная дата</p>
                </div>
            </>
   
    )
}
export default UserBirth;