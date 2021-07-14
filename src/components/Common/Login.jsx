import React from "react";
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
        document.querySelector("#userMailLogin").parentNode.classList.add("error");
        document.querySelector("#userPasswordLogin").parentNode.classList.add("error");
        document.querySelector("#userMailLogin").previousElementSibling.classList.add("error");
        document.querySelector("#userPasswordLogin").previousElementSibling.classList.add("error");
        document.querySelector(".login-window__error").classList.add("active");
    }

    const hideErrorInput = () => {
        document.querySelector("#userMailLogin").parentNode.classList.remove("error");
        document.querySelector("#userPasswordLogin").parentNode.classList.remove("error");
        document.querySelector("#userMailLogin").previousElementSibling.classList.remove("error");
        document.querySelector("#userPasswordLogin").previousElementSibling.classList.remove("error");
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
        document.querySelector(".login-window__wrapper").classList.remove("active");
        document.querySelector(".login-window__fade").classList.remove("active");
    }

    const showResetPassWindow = () => {
        hideLoginWindow();
        document.querySelector(".reset-window__wrapper").classList.add("active");
        document.querySelector(".reset-window__fade").classList.add("active");
    }

    const InputChange = (event) => {
        const label = event.target.previousElementSibling;
        if (event.target.name == "userMailLogin") changedUserMailLogin(event.target.value);
        if (event.target.name == "userPasswordLogin") changedUserPasswordLogin(event.target.value);
        if (event.target.value != "") {
            label.classList.add("changed");
        } else {
            label.classList.remove("changed");
        }
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
            // loginButton.classList.remove("is-waiting");
            loginButton.innerHTML = "Войти";
            if (res.isOK) {
                console.log(res);
                setTokens(res.tokens.accessToken, res.tokens.refreshToken);
            } else {
                showErrorInput();
                console.log(res);
            }})
        .catch(err => {
            // loginButton.classList.remove("is-waiting");
            loginButton.innerHTML = "Войти";
            showErrorInput();
            console.log(err);
        })
    };

    return (
        <>
            <div className="login-window__fade">
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
                                <label htmlFor="userMailLogin">Электронная почта</label>
                                <input className="" type="text" id="userMailLogin" name="userMailLogin" value={userMailLogin} onChange={InputChange}/>
                            </div>
                            <a className="login-window__link-to-reset" aria-label="Переход к форме восстановления пароля" onClick={showResetPassWindow}>Забыли?</a>
                            <div className="block-input__wrapper">
                                <label htmlFor="userPasswordLogin">Пароль</label>
                                <input className="" type="password" id="userPasswordLogin" name="userPasswordLogin" value={userPasswordLogin} onChange={InputChange}/>
                            </div>
                            <div className="login-button__wrapper">
                                <button disabled id="login-button" className="login-button active">Войти</button>
                            </div>
                        </form>
                    </div>
                    <div className="login-window__link-to-reg">
                        <Link to="/Reg" aria-label="Перейти на страницу регистрации" onClick={hideLoginWindow}>Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;