import * as React from "react";
import validator from "validator";

import "../scss/reg.scss";

import Header from "./header";
import NoScript from "./NoScript";
import UserName from "./RegForm/UserName";
import UserBirth from "./RegForm/UserBirth";
import UserMail from "./RegForm/UserMail";
import UserPhone from "./RegForm/UserPhone";
import UserPassport from "./RegForm/UserPassport";
import UserPassportDate from "./RegForm/UserPassportDate";
import UserPassportEmit from "./RegForm/UserPassportEmit";
import UserPassportEmitNum from "./RegForm/UserPassportEmitNum";
import UserLicId from "./RegForm/UserLicId";
import UserLicIdDate from "./RegForm/UserLicIdDate";
import UserPassword from "./RegForm/UserPassword";
import UserPasswordCheck from "./RegForm/UserPasswordCheck";

class Reg extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.inputCheck = this.inputCheck.bind(this);
        this.sendUserData = this.sendUserData.bind(this);
        this.showErrorInput = this.showErrorInput.bind(this);
        this.hideErrorInput = this.hideErrorInput.bind(this);
      
        this.state = {
            userName: "",
            userBirth: "",
            userMail: "",
            userPhone: "",
            userPassport: "",
            userPassportDate: "",
            userPassportEmit: "",
            userPassportEmitNum: "",
            userLicId: "",
            userLicIdDate: "",
            userPassword: "",
            userPasswordCheck: "",
        };
    }

    onInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    showErrorInput(key) {
        document.querySelector(`#${key}`).parentNode.nextSibling.classList.add("active");
        document.querySelector(`#${key}`).classList.add("error");
    }

    hideErrorInput(key) {
        document.querySelector(`#${key}`).parentNode.nextSibling.classList.remove("active");
        document.querySelector(`#${key}`).classList.remove("error");
    }

    inputCheck(event) {
        event.preventDefault();
        let inputsError = 0;

        Object.entries(this.state).forEach(([key, value]) => {
            switch(key) {
                case "userName":
                    if (!validator.isAlpha(value, 'ru-RU', {ignore: " -"})) {
                        this.showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        this.hideErrorInput(key);
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
                        this.showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        this.hideErrorInput(key);
                    }
                    break;

                case "userPhone":
                    if (!validator.isMobilePhone(value, 'ru-RU', {strictMode: false})) {
                        this.showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        this.hideErrorInput(key);
                    }
                    break;

                case "userPassport":
                    if (!validator.isPassportNumber(value, 'RU')) {
                        this.showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        this.hideErrorInput(key);
                    }
                    break;

                case "userPassportEmit":
                    if (!validator.isAlphanumeric(value, 'ru-RU', {ignore: " -"})) {
                        this.showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        this.hideErrorInput(key);
                    }
                    break;

                case "userPassportEmitNum":
                case "userLicId":
                    if (!validator.isInt(value)) {
                        this.showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        this.hideErrorInput(key);
                    }
                    break;

                case "userPassword":
                    if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1})) {
                        this.showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        this.hideErrorInput(key);
                    }
                    break;

                case "userPasswordCheck":
                    if (value !== this.state.userPassword) {
                        this.showErrorInput(key);
                        inputsError +=1;
                    }
                    else {
                        this.hideErrorInput(key);
                    }
                    break;
            };
        })

        if (inputsError == 0) {
            const button = document.querySelector(".submit-footer__button");
            button.innerHTML= '<i class="is-waiting"></i>';
            setTimeout(this.sendUserData, 1500)}; //Таймаут для проверки работоспособности
    }

    sendUserData() {
        const button = document.querySelector(".submit-footer__button");
        const data = {};
        Object.entries(this.state).forEach(([key, value]) => {
            if (key !== "userPasswordCheck") data[key] = value;
        })

        fetch("http://localhost:8000", {
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
                    document.querySelector(".reg-form-error").classList.remove("is-active");
                }
            })
            .catch(error => {
                document.querySelector(".reg-form-error").classList.add("is-active");
                console.log(error)});        
    }

    componentDidMount() {
        document.querySelector(".submit-footer__button").classList.remove("is-active");
        document.querySelector(".submit-footer__button").disabled = true;
    }

    componentDidUpdate() {
        let inputsEmpty = 0;
        Object.entries(this.state).forEach(([key, value]) => {
            // console.log(key, " - ", value);
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

    render () {
        const userName = this.state.userName;
        const userBirth = this.state.userBirth;
        const userMail = this.state.userMail;
        const userPhone = this.state.userPhone;
        const userPassport = this.state.userPassport;
        const userPassportDate = this.state.userPassportDate;
        const userPassportEmit = this.state.userPassportEmit;
        const userPassportEmitNum = this.state.userPassportEmitNum;
        const userLicId = this.state.userLicId;
        const userLicIdDate = this.state.userLicIdDate;
        const userPassword = this.state.userPassword;
        const userPasswordCheck = this.state.userPasswordCheck;
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
                            <UserName userName={userName} onChange={this.onInputChange}/>
                            <UserBirth userBirth={userBirth} onChange={this.onInputChange}/>
                            <UserMail userMail={userMail} onChange={this.onInputChange}/>
                            <UserPhone userPhone={userPhone} onChange={this.onInputChange}/>
                        </div>
                        <div className="block-input">
                            <h2>Паспорт</h2>
                            <UserPassport userPassport={userPassport} onChange={this.onInputChange}/>
                            <UserPassportDate userPassportDate={userPassportDate} onChange={this.onInputChange}/>
                            <UserPassportEmit userPassportEmit={userPassportEmit} onChange={this.onInputChange}/>
                            <UserPassportEmitNum userPassporEmitNum={userPassportEmitNum} onChange={this.onInputChange}/>
                        </div>
                        <div className="block-input">
                            <h2>Водительское удостоверение</h2>
                            <UserLicId userLicId={userLicId} onChange={this.onInputChange}/>
                            <UserLicIdDate userLicIdDate={userLicIdDate} onChange={this.onInputChange}/>
                        </div>
                        <div className="block-input">
                            <h2>Пароль</h2>
                            <UserPassword userPassword={userPassword} onChange={this.onInputChange}/>
                            <UserPasswordCheck userPasswordCheck={userPasswordCheck} onChange={this.onInputChange}/>
                        </div>
                    </form>
                </div>
            </main>
            <footer className="submit-footer">
                <div className="submit-footer__wrapper">
                    <button className="submit-footer__button is-active" onClick={this.inputCheck}>Продолжить
                    </button>
                </div>
            </footer>
        </>
        )       
    }
}

export default Reg;