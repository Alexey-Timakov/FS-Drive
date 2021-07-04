import * as React from "react";
import { useState, useEffect  } from "react";
import validator from "validator";

import "../../images/arrow_left.svg";
import "../../images/close_cross.svg";
import "../../images/reset_password.svg";

import "../../scss/login.scss";

function ResetPass () {
    let [userMailToReset, changedUserMailToReset] = useState("");
    const resetButton = document.querySelector("#reset-button");
    
    useEffect(() => {
        if (resetButton && validator.isEmail(userMailToReset)) {
            resetButton.disabled = false;
        } else if (resetButton && !validator.isEmail(userMailToReset)) {
            resetButton.disabled = true;
        }
    })
    const hideResetPassWindow = () => {
        document.querySelector(".reset-window__wrapper").classList.remove("is-active");
        document.querySelector(".reset-window__fade").classList.remove("is-active");
    }

    const showLoginWindow = () => {
        hideResetPassWindow();
        document.querySelector(".login-window__wrapper").classList.add("is-active");
        document.querySelector(".login-window__fade").classList.add("is-active");
    }

    const resetPass = (event) => {
        event.preventDefault();
        console.log("reset pass - ", userMailToReset);
        fetch("http://localhost:8000/resetpass", {
            method: "POST",
            headers: {
                "Origin": "http://localhost:8080",
                "Content-Type": "application/json;charset=utf-8",
              },
            body: JSON.stringify({
                "userMail": userMailToReset,
            }),
        })
        .then(res => res.json())
        .then(res => {
            if (res.isOK) {
                console.log(res);
                
            } else console.log(res)})
        .catch(err => console.log(err))
    };

    return (
        <>
        <div className="reset-window__wrapper">
            <div className="reset-window__close">
                <div>
                    <a onClick={showLoginWindow} target="_blank" aria-label="Назад к форме входа"><img src="./images/arrow_left.svg" alt="" aria-hidden="true" title="Назад к форме входа"/></a>
                </div>
                <div>
                    <a onClick={hideResetPassWindow} target="_blank" aria-label="Закрыть окно восстановления пароля"><img src="./images/close_cross.svg" alt="" aria-hidden="true" title="Закрыть окно восстановления пароля"/></a>
                </div>
            </div>
            <div className="reset-window__description">
                <img src="./images/reset_password.svg" alt="Векторное изображение человека" />
                <h1>Восстановление пароля</h1>
                <p>Мы отправим ссылку для восстановления пароля на вашу электронную почту</p>
            </div>
            <div className="reset-window__form-wrapper">
                <form onSubmit={resetPass} id="reset-window__form" name="reset-window__form">
                    <div className="block-input__wrapper">
                        <input className="" type="text" id="userMailToReset" name="userMailToReset" value={userMailToReset} onChange={(e) => changedUserMailToReset(e.target.value)}/>
                        <label htmlFor="userMailToReset">Электронная почта</label>
                    </div>
                    <div className="reset-button__wrapper">
                        <button disabled id="reset-button" className="reset-button is-active">Отправить</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="reset-window__fade"></div>
    </>

    )
}

export default ResetPass;