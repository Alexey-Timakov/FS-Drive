import * as React from "react";

class UserPasswordCheck extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userPasswordCheck: ""};
    }
    
    onValueChange(event) {
        this.props.onUserPasswordCheckChange(event.target.value);
    }
    render() {
        const userPasswordCheck = this.props.userPasswordCheck;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userPasswordCheck">Повторите пароль</label>
                    <input className="block-input__password eye-closed" type="text" id="userPasswordCheck" name="userPasswordCheck" value={userPasswordCheck} onChange={this.onValueChange} placeholder="•••••••••••••••••••"/>
                </div>
            </>
        )
    }
}

export default UserPasswordCheck;