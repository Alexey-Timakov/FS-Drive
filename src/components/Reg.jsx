import * as React from "react";

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
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onUserBirthChange = this.onUserBirthChange.bind(this);
        this.onUserMailChange = this.onUserMailChange.bind(this);
        this.onUserPhoneChange = this.onUserPhoneChange.bind(this);
        this.onUserPassportChange = this.onUserPassportChange.bind(this);
        this.onUserPassportDateChange = this.onUserPassportDateChange.bind(this);
        this.onUserPassportEmitChange = this.onUserPassportEmitChange.bind(this);
        this.onUserPassportEmitNumChange = this.onUserPassportEmitNumChange.bind(this);
        this.onUserLicIdChange = this.onUserLicIdChange.bind(this);
        this.onUserLicIdDateChange = this.onUserLicIdDateChange.bind(this);
        this.onUserPasswordChange = this.onUserPasswordChange.bind(this);
        this.onUserPasswordCheckChange = this.onUserPasswordCheckChange.bind(this);
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
    onUserNameChange(userName) {
        this.setState({userName});
    }
    onUserBirthChange(userBirth) {
        this.setState({userBirth});
    }
    onUserMailChange(userMail) {
        this.setState({userMail});
    }
    onUserPhoneChange(userPhone) {
        this.setState({userPhone});
    }
    onUserPassportChange(userPassport) {
        this.setState({userPassport});
    }
    onUserPassportDateChange(userPassportDate) {
        this.setState({userPassportDate});
    }
    onUserPassportEmitChange(userPassportEmit) {
        this.setState({userPassportEmit});
    }
    onUserPassportEmitNumChange(userPassportEmitNum) {
        this.setState({userPassportEmitNum});
    }
    onUserLicIdChange(userLicId) {
        this.setState({userLicId});
    }
    onUserLicIdDateChange(userLicIdDate) {
        this.setState({userLicIdDate});
    }
    onUserPasswordChange(userPassword) {
        this.setState({userPassword});
    }
    onUserPasswordCheckChange(userPasswordCheck) {
        this.setState({userPasswordCheck});
        console.log(userPasswordCheck);
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
                <div className="reg-form-wrapper">
                    <p>Шаг 1 из 3</p>
                    <h1>Расскажите о себе</h1>
                    <form>
                        <div className="block-input">
                            <h2>Информация о вас</h2>
                            <UserName userName={userName} onUserNameChange={this.onUserNameChange}/>
                            <UserBirth userBirth={userBirth} onUserBirthChange={this.onUserBirthChange}/>
                            <UserMail userMail={userMail} onUserMailChange={this.onUserMailChange}/>
                            <UserPhone userPhone={userPhone} onUserPhoneChange={this.onUserPhoneChange}/>
                        </div>
                        <div className="block-input">
                            <h2>Паспорт</h2>
                            <UserPassport userPassport={userPassport} onUserPassportChange={this.onUserPassportChange}/>
                            <UserPassportDate userPassportDate={userPassportDate} onUserPassportDateChange={this.onUserPassportDateChange}/>
                            <UserPassportEmit userPassportEmit={userPassportEmit} onUserPassportEmitChange={this.onUserPassportEmitChange}/>
                            <UserPassportEmitNum userPassporEmitNum={userPassportEmitNum} onUserPassportEmitNumChange={this.onUserPassportEmitNumChange}/>
                        </div>
                        <div className="block-input">
                            <h2>Водительское удостоверение</h2>
                            <UserLicId userLicId={userLicId} onUserLicIdChange={this.onUserLicIdChange}/>
                            <UserLicIdDate userLicIdDate={userLicIdDate} onUserLicIdDateChange={this.onUserLicIdDateChange}/>
                        </div>
                        <div className="block-input">
                            <h2>Пароль</h2>
                            <UserPassword userPassword={userPassword} onUserPasswordChange={this.onUserPasswordChange}/>
                            <UserPasswordCheck userPasswordCheck={userPasswordCheck} onUserPasswordCheckChange={this.onUserPasswordCheckChange}/>
                        </div>
                    </form>
                </div>
            </main>
            <footer>
                <div className="submit-footer">
                    <input className="submit__button is-active" type="button" value="Продолжить" />
                </div>
            </footer>
        </>
        )       
    }
}

export default Reg;