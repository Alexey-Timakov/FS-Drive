import * as React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import { useState } from "react";

import "../../images/sign_in.svg";

import "../../scss/login.scss";
import "../../images/close_cross.svg";

function Login () {
    const hideLoginWindow = () => {
        document.querySelector(".login-window__wrapper").classList.remove("is-active");
        document.querySelector(".login-window__fade").classList.remove("is-active");
    }
    const login = () => {
        event.preventDefault();
        console.log(userMailLogin, userPasswordLogin);
        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Origin": "http://localhost:8080",
                "Content-Type": "application/json;charset=utf-8",
              },
            body: JSON.stringify({
                "userMail": userMailLogin,
                "userPassword": userPasswordLogin
            }),
        })
        .then(res => res.json())
        .then(res => console.log(res.message))
        .catch(err => console.log(err))
    };

    let [userMailLogin, changedUserMailLogin] = useState("");
    let [userPasswordLogin, changedUserPasswordLogin] = useState("");
    
    return (
        <>
            <div className="login-window__wrapper">
                <div className="login-window__close">
                    <a onClick={hideLoginWindow} target="_blank" aria-label="Закрыть окно авторизации"><img src="./images/close_cross.svg" alt="" aria-hidden="true" title="Закрыть окно авторизации"/></a>
                </div>
                <div className="login-window__description">
                    <img src="./images/sign_in.svg" alt="Векторное изображение думающего человека" />
                    <h1>Авторизация</h1>
                </div>
                <div className="login-window__form-wrapper">
                    <form id="login-window__form" name="login-window__form">
                        <div className="block-input__wrapper">
                            <input className="" type="text" id="userMailLogin" name="userMailLogin" value={userMailLogin} onChange={(e) => changedUserMailLogin(e.target.value)}/>
                            <label htmlFor="userMailLogin">Электронная почта</label>
                        </div>
                        <div className="block-input__wrapper">
                            <input className="" type="password" id="userPasswordLogin" name="userPasswordLogin" value={userPasswordLogin} onChange={(e) => changedUserPasswordLogin(e.target.value)}/>
                            <label htmlFor="userPasswordLogin">Пароль</label>
                        </div>
                        <div className="login-button__wrapper">
                            <button className="login-button is-active" onClick={login}>Войти</button>
                        </div>
                    </form>
                </div>
                <div className="login-window__link">
                    <Link to="/Reg" aria-label="Перейти на страницу регистрации" onClick={hideLoginWindow}>Зарегистрироваться</Link>
                </div>
            </div>
            <div className="login-window__fade"></div>
        </>
    )
}

export default Login;