import React, { useState, useEffect } from "react";

function UserPhone ({addUserInfoToState}) {
    const STORE_TITLE = "userPhone";
    const [userPhone, userInputChange] = useState("+7-999-123-45-67");

    const onValueChange = (event) => {
        const phone: string = event.target.value.replace(/[^\d]/g, "");
        const firstPart: string = "+7";
        const secondPart: string = phone.slice(1, 4);
        const thirdPart: string = phone.slice(4, 7);
        const fourthPart: string = phone.slice(7,9);
        const lastPart: string = phone.slice(9);

        let modifiedPhone: string = "";
        if (phone.length !=0) modifiedPhone = firstPart;
        if (phone.length >= 1) modifiedPhone = modifiedPhone.concat("-", secondPart);
        if (phone.length >= 4) modifiedPhone = modifiedPhone.concat("-", thirdPart);
        if (phone.length >= 7) modifiedPhone = modifiedPhone.concat("-", fourthPart);
        if (phone.length >= 9) modifiedPhone = modifiedPhone.concat("-", lastPart);
        userInputChange(modifiedPhone);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userPhone);
    })
    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="userPhone">Телефон</label>
                    <input className="block-input__phone short" type="tel" id="userPhone" name="userPhone" value={userPhone} onChange={onValueChange} placeholder="+7-900-000-00-00" maxLength={16}/>
                </div>
            <p className="block-input__error">Некорректный номер</p>
            </div>
        </>
    )
}

export default UserPhone;