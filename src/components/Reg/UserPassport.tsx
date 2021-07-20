import React, { useState, useEffect } from "react";

function UserPassport ({addUserInfoToState}) {
    const STORE_TITLE = "userPassport";
    const [userPassport, userInputChange] = useState("");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userPassport);
    })

    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="passportNumber">Серия и номер</label>
                    <input className="block-input__passport short" type="text" id="userPassport" name="userPassport" value={userPassport} onChange={onValueChange} placeholder="0000 000000" pattern="[0-9]{4} [0-9]{6}" maxLength={10}/>
                </div>
                <p className="block-input__error">Некорректные серия или номер</p>
            </div>
        </>
    )
}

export default UserPassport;