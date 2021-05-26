import * as React from "react";

class UserPassword extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.changePassView = this.changePassView.bind(this);
        this.state = {userPassword: ""};
    }
    
    onValueChange(event) {
        this.props.onUserPasswordChange(event.target.value);
    }

    changePassView(event) {
        event.preventDefault();
        let input = event.target.previousSibling;
        // console.log(input);
        // console.log(event.target);
        if (input.getAttribute('type') == 'password') {
            event.target.classList.add('eye-on');
            input.setAttribute('type', 'text');
        } else {
            event.target.classList.remove('eye-on');
            input.setAttribute('type', 'password');
        }
    }
    render() {
        const userPassword = this.props.userPassword;

        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userPassword">Придумайте пароль</label>
                    <input className="block-input__password moved" type="password" id="userPassword" name="userPassword" value={userPassword} onChange={this.onValueChange} placeholder="•••••••••••••••••••"/>
                    <a href="#" className="eye-closed" onClick={this.changePassView}/>
                </div>
            </>
        )
    }
}

export default UserPassword;