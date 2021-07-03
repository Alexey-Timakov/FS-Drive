import * as React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import { useState, useEffect } from "react";
import validator from "validator";
import setTokens from "./setToken.js";

import "../../images/sign_in.svg";
import "../../images/close_cross.svg";

import "../../scss/login.scss";


function Login () {
    let [userMailLogin, changedUserMailLogin] = useState("");
    let [userPasswordLogin, changedUserPasswordLogin] = useState("");
    
    const loginButton = document.querySelector("#login-button");
    
    const showErrorInput = () => {
        document.querySelector("#userMailLogin").classList.add("error");
        document.querySelector("#userPasswordLogin").classList.add("error");
        document.querySelector(".login-window__error").classList.add("active");
    }

    const hideErrorInput = () => {
        document.querySelector("#userMailLogin").classList.remove("error");
        document.querySelector("#userPasswordLogin").classList.remove("error");
        document.querySelector(".login-window__error").classList.remove("active");
    }

    useEffect(() => {
        if (loginButton && validator.isEmail(userMailLogin) && userPasswordLogin != "") {
            loginButton.disabled = false;
        } else if (loginButton && (!validator.isEmail(userMailLogin) || userPasswordLogin == "")) {
            loginButton.disabled = true;
        }
    })

    const hideLoginWindow = () => {
        document.querySelector(".login-window__wrapper").classList.remove("is-active");
        document.querySelector(".login-window__fade").classList.remove("is-active");
    }

    const showResetPassWindow = () => {
        hideLoginWindow();
        document.querySelector(".reset-window__wrapper").classList.add("is-active");
        document.querySelector(".reset-window__fade").classList.add("is-active");
    }

    const login = (event) => {
        event.preventDefault();
        hideErrorInput();
        loginButton.innerHTML= '<i class="is-waiting"></i>';
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
        .then(res => {
            loginButton.classList.remove("is-waiting");
            loginButton.innerHTML = "Войти";
            if (res.isOK) {
                console.log(res);
                setTokens(res.tokens.accessToken, res.tokens.refreshToken);
            } else {
                showErrorInput();
                console.log(res);
            }})
        .catch(err => {
            loginButton.classList.remove("is-waiting");
            loginButton.innerHTML = "Войти";
            console.log(err);
        })
    };

    return (
        <>
            <div className="login-window__wrapper">
                <div className="login-window__close">
                    <a onClick={hideLoginWindow} target="_blank" aria-label="Закрыть окно авторизации"><img src="./images/close_cross.svg" alt="" aria-hidden="true" title="Закрыть окно авторизации"/></a>
                </div>
                <div className="login-window__description">
                    <img src="./images/sign_in.svg" alt="Векторное изображение думающего человека" />
                    <h1>Авторизация</h1>
                    <p className="login-window__error">Неверная почта или пароль</p>
                </div>
                <div className="login-window__form-wrapper">
                    <form onSubmit={login} id="login-window__form" name="login-window__form">
                        <div className="block-input__wrapper">
                            <input className="" type="text" id="userMailLogin" name="userMailLogin" value={userMailLogin} onChange={(e) => changedUserMailLogin(e.target.value)}/>
                            <label htmlFor="userMailLogin">Электронная почта</label>
                        </div>
                        <div className="block-input__wrapper">
                            <input className="" type="password" id="userPasswordLogin" name="userPasswordLogin" value={userPasswordLogin} onChange={(e) => changedUserPasswordLogin(e.target.value)}/>
                            <label htmlFor="userPasswordLogin">Пароль</label>
                            <a aria-label="Переход к форме восстановления пароля" onClick={showResetPassWindow}>Забыли?</a>
                        </div>
                        <div className="login-button__wrapper">
                            <button disabled id="login-button" className="login-button is-active">Войти</button>
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