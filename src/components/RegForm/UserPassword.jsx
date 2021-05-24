import * as React from "react";

class UserPassword extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userPassword: ""};
    }
    
    onValueChange(event) {
        this.props.onUserPasswordChange(event.target.value);
    }
    render() {
        const userPassword = this.props.userPassword;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userPassword">Придумайте пароль</label>
                    <input className="block-input__password eye-closed" type="text" id="userPassword" name="userPassword" value={userPassword} onChange={this.onValueChange} placeholder="•••••••••••••••••••"/>
                </div>
            </>
        )
    }
}

export default UserPassword;