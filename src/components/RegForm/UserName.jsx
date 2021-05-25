import * as React from "react";
import validator from "validator";

class UserName extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userName: "",}
    }
    
    onValueChange(event) {
        this.props.onUserNameChange(event.target.value);
    }

    render() {
        const userName = this.props.userName;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userName">ФИО:</label>
                    <input className="block-input__name" type="text" id="userName" name="userName" value={userName} onChange={this.onValueChange} placeholder="ФИО полностью"/>
                </div>
                <p className="block-input__error">Некорректное имя</p>
            </>
        )
    }
}

export default UserName;