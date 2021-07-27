import React, { useEffect } from "react";
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
import UserPassportEmit from "../../Containers/Reg/UserPassportEmit";
import UserPassportEmitNum from "../../Containers/Reg/UserPassportEmitNum";
import UserLicId from "../../Containers/Reg/UserLicId";
import UserLicIdDate from "../../Containers/Reg/UserLicIdDate";
import UserPassword from "../../Containers/Reg/UserPassword";
import UserPasswordCheck from "../../Containers/Reg/UserPasswordCheck";

import setTokens from "../Common/setToken.js";

function Reg () {

    const showErrorInput = (key) => {
        document.querySelector(`#${key}`).parentNode.nextSibling.classList.add("active");
        document.querySelector(`#${key}`).classList.add("error");
    }
    
    const hideErrorInput = (key) => {
        document.querySelector(`#${key}`).parentNode.nextSibling.classList.remove("active");
        document.querySelector(`#${key}`).classList.remove("error");
    }
    
    const inputCheck = (event) => {
        console.log(store.getState());
        event.preventDefault();
        let inputsError = 0;
    
        Object.entries(store.getState().user).forEach(([key, value]) => {
            switch(key) {
                case "userName":
                    if (!validator.isAlpha(value, 'ru-RU', {ignore: " -"})) {
                        showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        hideErrorInput(key);
                    }
                    break;
    
                // case "userBirth":
                // case "userPassportDate":
                // case "userLicIdDate":
                //     // if (!validator.isDate(+value, {format: "DD/MM/YYYY", delimiters: ['/', '-', '.']})) {
                //     if (!validator.isISO8601(value.toString())) {
                //         this.showErrorInput(key);
                //         inputsError +=1;
                //     }
                //     else {
                //         this.hideErrorInput(key);
                //     }
                //     break;
    
                case "userMail":
                    if (!validator.isEmail(value)) {
                        showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        hideErrorInput(key);
                    }
                    break;
    
                case "userPhone":
                    if (!validator.isMobilePhone(value, 'ru-RU', {strictMode: false})) {
                        showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        hideErrorInput(key);
                    }
                    break;
    
                case "userPassport":
                    if (!validator.isPassportNumber(value, 'RU')) {
                        showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        hideErrorInput(key);
                    }
                    break;
    
                case "userPassportEmit":
                    if (!validator.isAlphanumeric(value, 'ru-RU', {ignore: " -"})) {
                        showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        hideErrorInput(key);
                    }
                    break;
    
                case "userPassportEmitNum":
                case "userLicId":
                    if (!validator.isInt(value)) {
                        showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        hideErrorInput(key);
                    }
                    break;
    
                case "userPassword":
                    if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1})) {
                        showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        hideErrorInput(key);
                    }
                    break;
    
                case "userPasswordCheck":
                    if (value !== store.getState().user.userPassword) {
                        showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        hideErrorInput(key);
                    }
                    break;
            };
        })
    
        if (inputsError == 0) {
            const button = document.querySelector(".submit-footer__button");
            button.innerHTML= '<i class="is-waiting"></i>';
            sendUserData();
        }
    }
    
    const changeButtonIsActive = () => {
        let inputsEmpty = 0;
        Object.entries(store.getState().user).forEach(([key, value]) => {
            if (value == "") {
                inputsEmpty +=1;
            }
        });
        if (inputsEmpty == 0) {
            document.querySelector(".submit-footer__button").classList.add("is-active");
            document.querySelector(".submit-footer__button").disabled = false;
        } else {
            document.querySelector(".submit-footer__button").classList.remove("is-active");
            document.querySelector(".submit-footer__button").disabled = true;
        }
    }

    store.subscribe(changeButtonIsActive);
    
    const sendUserData = () => {
        const button = document.querySelector(".submit-footer__button");
        const data = {};
        Object.entries(store.getState().user).forEach(([key, value]) => {
            if (key !== "userPasswordCheck") data[key] = value;
        })
        
        fetch("http://localhost:8000/registration", {
            method: "POST",
            headers: {
                "Origin": "http://localhost:8080",
                "Content-Type": "application/json;charset=utf-8"
              },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => {
                button.innerHTML= 'Продолжить';
                console.log("POST - ", res);
                if (res.code == 1) {
                    document.querySelector(".reg-form-error").classList.add("is-active");
                } else if (res.code == 0) {
                    setTokens(res.tokens.accessToken, res.tokens.refreshToken);
                    document.querySelector(".reg-form-error").classList.remove("is-active");
                }
            })
            .catch(error => {
                document.querySelector(".reg-form-error").classList.add("is-active");
                console.log(error)});        
    }
    return (
        <>
        <Header />
        <NoScript />
        <main>
            <div className="reg-form-error">Не удалось продолжить регистрацию. Попробуйте ещё раз.</div>
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
                        <UserPassportEmit />
                        <UserPassportEmitNum />
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
                <button className="submit-footer__button" onClick={inputCheck}>Продолжить</button>
            </div>
        </footer>
    </>
    )       
}

export default Reg;