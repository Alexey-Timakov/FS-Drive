import React, { useState, useEffect } from "react";

function UserLicId ({addUserInfoToState}) {
    const STORE_TITLE = "userLicId";
    const [userLicId, userInputChange] = useState("1234 567890");

    const onValueChange = (event) => {
        const userLicId: string = event.target.value.replace(/[^\d]/g, "");
        const firstPart: string = userLicId.slice(0,4);
        const lastPart: string = userLicId.slice(4);

        let modifiedUserLicId: string = "";
        if (userLicId.length !=0) modifiedUserLicId = firstPart;
        if (userLicId.length >= 4) modifiedUserLicId = modifiedUserLicId.concat(" ", lastPart);


        userInputChange(modifiedUserLicId);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userLicId);
    })
        return (
            <>
                <div className="block-input__wrapper">
                    <div className="block-input__input">
                        <label htmlFor="licenseNumber">Серия и номер</label>
                        <input className="block-input__licence-num short" type="text" id="userLicId" name="userLicId" value={userLicId} onChange={onValueChange} placeholder="0000 000000" maxLength={11} pattern="[0-9]{4} [0-9]{6}"/>
                    </div>
                <p className="block-input__error">Некорректные серия или номер</p>
                </div>
            </>
        )
}

export default UserLicId;