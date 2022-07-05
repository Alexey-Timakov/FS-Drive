import React, { useState, useEffect } from "react";

function UserPasswordCheck ({addUserInfoToState}) {
    const STORE_TITLE = "userPasswordCheck";
    const [userPasswordCheck, userInputChange] = useState("ZAQ!2wsxCDE#");

    const onValueChange = (event) => {
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userPasswordCheck);
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
                    <label htmlFor="userPasswordCheck">Повторите пароль</label>
                    <input className="block-input__password" type="password" id="userPasswordCheck" name="userPasswordCheck" value={userPasswordCheck} onChange={onValueChange} placeholder="•••••••••••••••••••"/>
                    <a href="#" className="eye-closed" onClick={changePassView}/>
                </div>
            <p className="block-input__error">Пароли не совпадают</p>
            </div>
        </>
    )
}

export default UserPasswordCheck;