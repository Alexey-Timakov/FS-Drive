import React, { useState, useEffect } from "react";

function UserPassportEmitNum ({addUserInfoToState}) {
    const STORE_TITLE = "userPassportEmitNum";
    const [userPassportEmitNum, userInputChange] = useState("");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userPassportEmitNum);
    })

    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="userPassportEmitNum">Код подразделения</label>
                    <input className="block-input__passport-emit-num short" type="text" id="userPassportEmitNum" name="userPassportEmitNum" value={userPassportEmitNum} onChange={onValueChange} placeholder="000-000" pattern="[0-9]{3}-[0-9]{3}" maxLength={6}/>
                </div>
            <p className="block-input__error">Некорректый код</p>
            </div>
        </>
    )
}

export default UserPassportEmitNum;