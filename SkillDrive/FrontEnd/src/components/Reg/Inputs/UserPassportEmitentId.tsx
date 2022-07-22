import React, { useState, useEffect } from "react";

function UserPassportEmitentId ({addUserInfoToState}) {
    const STORE_TITLE = "userPassportEmitentId";
    const [userPassportEmitentId, userInputChange] = useState("123-456");

    const onValueChange = (event) => {
        const passportEmitNum: string = event.target.value.replace(/[^\d]/g, "");
        const firstPart: string = passportEmitNum.slice(0,3);
        const lastPart: string = passportEmitNum.slice(3);
        let modifiedPassportEmitNum: string = "";
        if (passportEmitNum.length !=0) modifiedPassportEmitNum = firstPart;
        if (passportEmitNum.length >= 3) modifiedPassportEmitNum = modifiedPassportEmitNum.concat("-", lastPart);

        userInputChange(modifiedPassportEmitNum);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userPassportEmitentId);
    })

    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="userPassportEmitentId">Код подразделения</label>
                    <input className="block-input__passport-emit-num short" type="text" id="userPassportEmitentId" name="userPassportEmitentId" value={userPassportEmitentId} onChange={onValueChange} placeholder="000-000" pattern="[0-9]{3}-[0-9]{3}" maxLength={7}/>
                </div>
            <p className="block-input__error">Некорректый код</p>
            </div>
        </>
    )
}

export default UserPassportEmitentId;