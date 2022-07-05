import React, { useRef, useState } from "react";
import validator from "validator";

import "../../scss/reg.scss";

import { store } from "../../Store/Store.jsx";

import Header from "../Common/header";
import NoScript from "../Common/NoScript";

import UserName from "../../Containers/Reg/USerName";
import UserBirth from "../../Containers/Reg/UserBirth";
import UserMail from "../../Containers/Reg/UserMail";
import UserPhone from "../../Containers/Reg/UserPhone";
import UserPassport from "../../Containers/Reg/UserPassport";
import UserPassportDate from "../../Containers/Reg/UserPassportDate";
import UserPassportEmitent from "../../Containers/Reg/UserPassportEmitent";
import UserPassportEmitentId from "../../Containers/Reg/UserPassportEmitentId";
import UserLicId from "../../Containers/Reg/UserLicId";
import UserLicIdDate from "../../Containers/Reg/UserLicIdDate";
import UserPassword from "../../Containers/Reg/UserPassword";
import UserPasswordCheck from "../../Containers/Reg/UserPasswordCheck";

import { setTokens } from "../../services/setToken";
import { ApiService } from "../../services/apiService";
import { userData } from "../../interfaces/userData";
import { userDataWithTokens } from "../../interfaces/userDataWithTokens";

function Reg() {
  const submitButton = useRef(null);
  const [errorBarIsActive, setErrorBarIsActive] = useState(false);

  const showErrorInput = (key: string) => {
    const inputElement: HTMLInputElement = document.querySelector(`#${key}`);
    inputElement.classList.add("error");

    const descriptionElement: Element = inputElement.parentElement.nextElementSibling;
    descriptionElement.classList.add("active");
  }

  const hideErrorInput = (key: string) => {
    const inputElement: HTMLInputElement = document.querySelector(`#${key}`);
    inputElement.classList.remove("error");

    const descriptionElement: Element = inputElement.parentElement.nextElementSibling;
    descriptionElement.classList.remove("active");
  }

  const inputCheck = (event: React.SyntheticEvent) => {
    event.preventDefault();
    let inputsError = 0;

    Object.entries(store.getState().user as userData).forEach(([key, value]) => {
      switch (key) {
        case "userName":
          if (!validator.isAlpha(value, 'ru-RU', { ignore: " -" })) {
            showErrorInput(key);
            inputsError += 1;
          }
          else {
            hideErrorInput(key);
          }
          break;

        case "userBirth":
        case "userPassportDate":
        case "userLicIdDate":
          if (!validator.isISO8601(value.toString())) {
            showErrorInput(key);
            inputsError += 1;
          }
          else {
            hideErrorInput(key);
          }
          break;

        case "userMail":
          if (!validator.isEmail(value)) {
            showErrorInput(key);
            inputsError += 1;
          }
          else {
            hideErrorInput(key);
          }
          break;

        case "userPhone":
          const phone = value.replace(/[^\d]/g, "");
          if (!validator.isMobilePhone(phone, 'ru-RU', { strictMode: false })) {
            showErrorInput(key);
            inputsError += 1;
          }
          else {
            hideErrorInput(key);
          }
          break;

        case "userPassport":
          if (!validator.isPassportNumber(value, 'RU')) {
            showErrorInput(key);
            inputsError += 1;
          }
          else {
            hideErrorInput(key);
          }
          break;

        case "userPassportEmitent":
          if (!validator.isAlphanumeric(value, 'ru-RU', { ignore: " -" })) {
            showErrorInput(key);
            inputsError += 1;
          }
          else {
            hideErrorInput(key);
          }
          break;

        case "userPassportEmitentId":
        case "userLicId":
          const num = value.replace(/[^\d]/g, "");
          if (!validator.isInt(num)) {
            showErrorInput(key);
            inputsError += 1;
          }
          else {
            hideErrorInput(key);
          }
          break;

        case "userPassword":
          if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })) {
            showErrorInput(key);
            inputsError += 1;
          }
          else {
            hideErrorInput(key);
          }
          break;

        case "userPasswordCheck":
          if (value !== store.getState().user.userPassword) {
            showErrorInput(key);
            inputsError += 1;
          }
          else {
            hideErrorInput(key);
          }
          break;
      };
    })

    if (inputsError === 0) {
      sendUserData();
    }
  }

  const enableSubmitButton = () => {
    const submitButtonCurrent = submitButton.current;
    submitButtonCurrent.classList.add("is-active");
    submitButtonCurrent.disabled = false;
  }

  const disableSubmitButton = () => {
    const submitButtonCurrent = submitButton.current;
    submitButtonCurrent.classList.remove("is-active");
    submitButtonCurrent.disabled = true;
  }

  const waitingSubmitButton = () => {
    const submitButtonCurrent = submitButton.current;
    submitButtonCurrent.innerHTML = '<i class="is-waiting"></i>';
  }

  const staticSubmitButton = () => {
    const submitButtonCurrent = submitButton.current;
    submitButtonCurrent.innerHTML = 'Продолжить';
  }

  const toggleSubmitButtonActivity = () => {
    let inputsEmpty = 0;

    Object.entries(store.getState().user).forEach(([key, value]) => {
      if (value == "") {
        inputsEmpty += 1;
      }
    });

    if (inputsEmpty === 0) {
      enableSubmitButton();
    } else {
      disableSubmitButton();
    }
  }

  store.subscribe(toggleSubmitButtonActivity);

  const sendUserData = () => {
    waitingSubmitButton();

    const data = {} as userData;

    Object.entries(store.getState().user).forEach(([key, value]) => {
      if (key !== "userPasswordCheck") data[key] = value;
    })

    ApiService.sendDataToServer("http://localhost:3000/users/registration", "POST", data)
      .then(res => {
        staticSubmitButton();
        if (res.ok) {
          setErrorBarIsActive(false);
          // const responceData: userDataWithTokens = res.json();
          return res.json();
        } else {
          setErrorBarIsActive(true);
          throw new Error("Something went wrong");
        }
      })
      .then(data => {
        setTokens(data.accessToken, data.refreshToken);
      })
      .catch(error => {
        console.log(error);
        setErrorBarIsActive(true);
        staticSubmitButton();
      });

  }
  return (
    <>
      <Header />
      <NoScript />
      <main>
        <div className={`reg-form-error ${errorBarIsActive ? "is-active" : ""}`}>Не удалось продолжить регистрацию. Попробуйте ещё раз.</div>
        <div className="reg-form-wrapper">
          <p>Шаг 1 из 3</p>
          <h1>Расскажите о себе</h1>
          <form id="userData" name="userData">
            <div className="block-input">
              <h2>Информация о вас</h2>
              <UserName />
              <UserBirth />
              <UserMail />
              <UserPhone />
            </div>
            <div className="block-input">
              <h2>Паспорт</h2>
              <UserPassport />
              <UserPassportDate />
              <UserPassportEmitent />
              <UserPassportEmitentId />
            </div>
            <div className="block-input">
              <h2>Водительское удостоверение</h2>
              <UserLicId />
              <UserLicIdDate />
            </div>
            <div className="block-input">
              <h2>Пароль</h2>
              <UserPassword />
              <UserPasswordCheck />
            </div>
          </form>
        </div>
      </main>
      <footer className="submit-footer">
        <div className="submit-footer__wrapper">
          <button className="submit-footer__button" ref={submitButton} onClick={inputCheck}>Продолжить</button>
        </div>
      </footer>
    </>
  )
}

export default Reg;