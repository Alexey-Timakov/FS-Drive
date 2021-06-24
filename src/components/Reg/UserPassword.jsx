import * as React from "react";

class UserPassword extends React.Component {
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
        const userPassword = this.props.userPassword;

        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userPassword">Придумайте пароль</label>
                    <input className="block-input__password moved" type="password" id="userPassword" name="userPassword" value={userPassword} onChange={this.onValueChange} placeholder="•••••••••••••••••••"/>
                    <a href="#" className="eye-closed" onClick={this.changePassView}/>
                </div>
                <p className="block-input__error">Придумайте более сложный пароль (a-z, A-Z, 1-9, #,@...)</p>
            </>
        )
    }
}

export default UserPassword;