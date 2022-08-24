import React, { useEffect, useRef } from "react";
import validator from "validator";
import "./RegStep1.scss";

import { store } from "../../Store/Store";

import UserName from "../../Containers/Reg/USerName";
import UserInputDate from "../../Containers/Reg/UserInputDate";
import UserMail from "../../Containers/Reg/UserMail";
import UserPhone from "../../Containers/Reg/UserPhone";
import UserPassport from "../../Containers/Reg/UserPassport";
import UserPassportEmitent from "../../Containers/Reg/UserPassportEmitent";
import UserPassportEmitentId from "../../Containers/Reg/UserPassportEmitentId";
import UserLicId from "../../Containers/Reg/UserLicId";
import UserPassword from "../../Containers/Reg/UserPassword";
import UserPasswordCheck from "../../Containers/Reg/UserPasswordCheck";

import { $api } from "../../http";
import { setAccessToken } from "../../services/setToken";
import { IUserDataToReg } from "../../Interfaces/IUserDataToReg";
import { UserState } from "../../interfaces/UserState";
import { UserDataWithTokens } from "../../interfaces/UserDataWithTokens";
import { IRegStep } from "../../interfaces/IRegStep";

import { useSelector } from "react-redux";
import { addUserInfoToStateAction } from "../../Actions/addUserInfoToStateAction";

function RegStep1({ changeRegStep, toggleErrorBar }: IRegStep) {

  const submitButton = useRef(null);
  const newUserInfo = useSelector((state: UserState) => state.user);

  useEffect(() => {
    toggleSubmitButtonActivity();
  }, [newUserInfo]);

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

  const inputsCheck = (event: React.SyntheticEvent) => {
    event.preventDefault();
    let inputsError = 0;

    const newData = new IUserDataToReg(store.getState().user);
    Object.entries(newData).forEach(([key, value]) => {
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
          if (!validator.isDate(value.toString(), { format: "DD/MM/YYYY", delimiters: [".", "/", "-"] })) {
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

    const newData = new IUserDataToReg(store.getState().user);
    Object.entries(newData).forEach(([key, value]) => {
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

  const sendUserData = () => {
    waitingSubmitButton();

    const newData = new IUserDataToReg(store.getState().user);

    $api.post<UserDataWithTokens>("users/registration", newData)
      .then((data) => {
        staticSubmitButton();
        toggleErrorBar(false, 0);
        setAccessToken(data.data.accessToken);
        store.dispatch(addUserInfoToStateAction("id", data.data.id))
        changeRegStep(+1);
      })
      .catch(error => {
        staticSubmitButton();
        toggleErrorBar(true, 0)
        console.log(error);
      });
  }
  return (
    <>
      <div className="reg-form-wrapper">
        <h1>Расскажите о себе</h1>
        <form id="userData" name="userData">
          <div className="block-input">
            <h2>Информация о вас</h2>
            <UserName />
            <UserInputDate inputName={"userBirth"} inputTitle={"Дата рождения"} />
            <UserMail />
            <UserPhone />
          </div>
          <div className="block-input">
            <h2>Паспорт</h2>
            <UserPassport />
            <UserInputDate inputName={"userPassportDate"} inputTitle={"Дата выдачи"} />
            <UserPassportEmitent />
            <UserPassportEmitentId />
          </div>
          <div className="block-input">
            <h2>Водительское удостоверение</h2>
            <UserLicId />
            <UserInputDate inputName={"userLicIdDate"} inputTitle={"Дата выдачи"} />
          </div>
          <div className="block-input">
            <h2>Пароль</h2>
            <UserPassword />
            <UserPasswordCheck />
          </div>
        </form>
      </div>
      <div className="submit-footer">
        <div className="submit-footer__wrapper">
          <button className="submit-footer__button" ref={submitButton} onClick={inputsCheck}>Продолжить</button>
        </div>
      </div>
    </>
  )
}

export default RegStep1;