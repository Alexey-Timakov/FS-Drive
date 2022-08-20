import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import validator from "validator";
import $api from "../../http";
import { setAccessToken } from "../../services/setToken";

import { UserDataToLogin } from "../../interfaces/UserDataToLogin";
import { UserDataWithTokens } from "../../interfaces/UserDataWithTokens";

import "./images/sign_in.svg";
import "./images/close_cross.svg";

import "./Login.scss";

function Login() {
  let [userMailLogin, changedUserMailLogin] = useState("");
  let [userPasswordLogin, changedUserPasswordLogin] = useState("");

  const loginButton: HTMLButtonElement = document.querySelector("#login-button");

  const showErrorInput = () => {
    document.querySelector<HTMLInputElement>("#userMailLogin").parentElement.classList.add("error");
    document.querySelector<HTMLInputElement>("#userPasswordLogin").parentElement.classList.add("error");
    document.querySelector<HTMLInputElement>("#userMailLogin").previousElementSibling.classList.add("error");
    document.querySelector<HTMLInputElement>("#userPasswordLogin").previousElementSibling.classList.add("error");
    document.querySelector<HTMLParagraphElement>(".login-window__error").classList.add("active");
  }

  const hideErrorInput = () => {
    document.querySelector<HTMLInputElement>("#userMailLogin").parentElement.classList.remove("error");
    document.querySelector<HTMLInputElement>("#userPasswordLogin").parentElement.classList.remove("error");
    document.querySelector<HTMLInputElement>("#userMailLogin").previousElementSibling.classList.remove("error");
    document.querySelector<HTMLInputElement>("#userPasswordLogin").previousElementSibling.classList.remove("error");
    document.querySelector<HTMLParagraphElement>(".login-window__error").classList.remove("active");
  }

  useEffect(() => {
    if (loginButton && validator.isEmail(userMailLogin) && userPasswordLogin !== "") {
      loginButton.disabled = false;
    } else if (loginButton && (!validator.isEmail(userMailLogin) || userPasswordLogin === "")) {
      loginButton.disabled = true;
    }
  })

  const hideLoginWindow = () => {
    document.querySelector<HTMLDivElement>(".login-window__wrapper").classList.remove("active");
    document.querySelector<HTMLDivElement>(".login-window__fade").classList.remove("active");
  }

  const showResetPassWindow = () => {
    hideLoginWindow();
    document.querySelector<HTMLDivElement>(".reset-window__wrapper").classList.add("active");
    document.querySelector<HTMLDivElement>(".reset-window__fade").classList.add("active");
  }

  const loginButtonWaiting = () => {
    loginButton.innerHTML = '<i class="is-waiting"></i>';
  }
  
  const loginButtonStatinc = () => {
    loginButton.innerHTML = "Войти";
    loginButton.classList.remove("is-waiting");
  }

  const InputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = event.target;
    const labelForTarget: HTMLLabelElement = target.previousElementSibling as HTMLLabelElement;
    if (target.name === "userMailLogin") {
      changedUserMailLogin(target.value);
    }
    if (target.name === "userPasswordLogin") {
      changedUserPasswordLogin(target.value);
    }
    if (target.value !== "") {
      labelForTarget.classList.add("changed");
    } else {
      labelForTarget.classList.remove("changed");
    }
  }

  const login = (event: React.SyntheticEvent) => {
    event.preventDefault();
    hideErrorInput();
    loginButtonWaiting();

    const body: UserDataToLogin = {
      "userMail": userMailLogin,
      "userPassword": userPasswordLogin
    };

    $api.post<UserDataWithTokens>("users/auth", body)
      .then(res => {
        loginButtonStatinc();
        setAccessToken(res.data.accessToken);
      })
      .catch(err => {
        loginButtonStatinc();
        showErrorInput();
        console.log(err);
      })
  };

  return (
    <>
      <div className="login-window__fade">
        <div className="login-window__wrapper">
          <div className="login-window__close">
            <a onClick={hideLoginWindow} target="_blank" aria-label="Закрыть окно авторизации"><img src="./close_cross.svg" alt="" aria-hidden="true" title="Закрыть окно авторизации" /></a>
          </div>
          <div className="login-window__description">
            <img src="./sign_in.svg" alt="Векторное изображение думающего человека" />
            <h1>Авторизация</h1>
            <p className="login-window__error">Неверная почта или пароль</p>
          </div>
          <div className="login-window__form-wrapper">
            <form onSubmit={login} id="login-window__form" name="login-window__form">
              <div className="block-input__wrapper">
                <label htmlFor="userMailLogin">Электронная почта</label>
                <input className="" type="text" id="userMailLogin" name="userMailLogin" value={userMailLogin} onChange={InputChange} />
              </div>
              <a className="login-window__link-to-reset" aria-label="Переход к форме восстановления пароля" onClick={showResetPassWindow}>Забыли?</a>
              <div className="block-input__wrapper">
                <label htmlFor="userPasswordLogin">Пароль</label>
                <input className="" type="password" id="userPasswordLogin" name="userPasswordLogin" value={userPasswordLogin} onChange={InputChange} />
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