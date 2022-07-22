import React, { useState, useEffect } from "react";

function UserPassword ({addUserInfoToState}) {
    const STORE_TITLE = "userPassword";
    const [userPassword, userInputChange] = useState("ZAQ!2wsxCDE#");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userPassword);
    })

    const changePassView = (event) => {
        event.preventDefault();
        let input = event.target.previousSibling;
        if (input.getAttribute('type') == 'password') {
            event.target.classList.add('eye-on');
            input.setAttribute('type', 'text');
        } else {
            event.target.classList.remove('eye-on');
            input.setAttribute('type', 'password');
        }
    }

    return (
        <>
            <div className="block-input__wrapper">
                <div className="block-input__input">
                    <label htmlFor="userPassword">Придумайте пароль</label>
                    <input className="block-input__password" type="password" id="userPassword" name="userPassword" value={userPassword} onChange={onValueChange} placeholder="•••••••••••••••••••"/>
                    <a href="#" className="eye-closed" onClick={changePassView}/>
                </div>
            <p className="block-input__error">Придумайте более сложный пароль (a-z, A-Z, 0-9, #,@...)</p>
            </div>
        </>
    )
}

export default UserPassword;