import React, { useState, useEffect } from "react";

function UserPhone ({addUserInfoToState}) {
    const STORE_TITLE = "userPhone";
    const [userPhone, userInputChange] = useState("");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userPhone);
    })
    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="userPhone">Телефон</label>
                    <input className="block-input__phone short" type="tel" id="userPhone" name="userPhone" value={userPhone} onChange={onValueChange} placeholder="8 900 000-00-00" maxLength={11}/>
                </div>
            <p className="block-input__error">Некорректный номер</p>
            </div>
        </>
    )
}

export default UserPhone;