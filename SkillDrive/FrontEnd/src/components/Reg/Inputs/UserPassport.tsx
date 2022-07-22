import React, { useState, useEffect } from "react";

function UserPassport ({addUserInfoToState}) {
    const STORE_TITLE = "userPassport";
    const [userPassport, userInputChange] = useState("1234 567890");

    const onValueChange = (event) => {
        const passport: string = event.target.value.replace(/[^\d]/g, "");
        const firstPart: string = passport.slice(0,4);
        const lastPart: string = passport.slice(4);

        let modifiedPassport: string = "";
        if (passport.length !=0) modifiedPassport = firstPart;
        if (passport.length >= 4) modifiedPassport = modifiedPassport.concat(" ", lastPart);

        userInputChange(modifiedPassport);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userPassport);
    })

    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="passportNumber">Серия и номер</label>
                    <input className="block-input__passport short" type="text" id="userPassport" name="userPassport" value={userPassport} onChange={onValueChange} placeholder="0000 000000" pattern="[0-9]{4} [0-9]{6}" maxLength={11}/>
                </div>
                <p className="block-input__error">Некорректные серия или номер</p>
            </div>
        </>
    )
}

export default UserPassport;