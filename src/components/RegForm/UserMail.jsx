import * as React from "react";

class UserMail extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userMail: ""};
    }
    
    onValueChange(event) {
        this.props.onUserMailChange(event.target.value);
    }
    render() {
        const userMail = this.props.userMail;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userMail">Электронная почта</label>
                    <input className="block-input__email" type="email" id="userMail" name="userMail" value={userMail} onChange={this.onValueChange} placeholder="mail@example.com"/>
                </div>
            </>
        )
    }
}

export default UserMail;