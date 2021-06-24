import * as React from "react";

class UserPasswordCheck extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.changePassView = this.changePassView.bind(this);
    }
    
    onValueChange(event) {
        this.props.onChange(event);
    }

    changePassView(event) {
        event.preventDefault();
        let input = event.target.previousSibling;
        if (input.getAttribute('type') == 'password') {
            event.target.classList.add('eye-on');
            input.setAttribute('type', 'text');
        } else {
            event.target.classList.remove('eye-on');
            input.setAttribute('type', 'password');
        }
    }
    
    render() {
        const userPasswordCheck = this.props.userPasswordCheck;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userPasswordCheck">Повторите пароль</label>
                    <input className="block-input__password moved" type="password" id="userPasswordCheck" name="userPasswordCheck" value={userPasswordCheck} onChange={this.onValueChange} placeholder="•••••••••••••••••••"/>
                    <a href="#" className="eye-closed" onClick={this.changePassView}/>
                </div>
                <p className="block-input__error">Пароли не совпадают</p>
            </>
        )
    }
}

export default UserPasswordCheck;