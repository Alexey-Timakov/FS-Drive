import React, { useState, useEffect } from "react";

function UserLicId ({addUserInfoToState}) {
    const STORE_TITLE = "userLicId";
    const [userLicId, userInputChange] = useState("");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userLicId);
    })
        return (
            <>
                <div className="block-input__wrapper">
                    <div className="block-input__input">
                        <label htmlFor="licenseNumber">Серия и номер</label>
                        <input className="block-input__licence-num short" type="text" id="userLicId" name="userLicId" value={userLicId} onChange={onValueChange} placeholder="0000 000000" maxLength={10} pattern="[0-9]{4} [0-9]{6}"/>
                    </div>
                <p className="block-input__error">Некорректные серия или номер</p>
                </div>
            </>
        )
}

export default UserLicId;