import * as React from "react";

class UserMail extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
    }
    
    onValueChange(event) {
        this.props.onChange(event);
    }

    render() {
        const userMail = this.props.userMail;

        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userMail">Электронная почта</label>
                    <input className="block-input__email" type="text" id="userMail" name="userMail" value={userMail} onChange={this.onValueChange} placeholder="mail@example.com"/>
                </div>
                <p className="block-input__error">Некорректная почта</p>
            </>
        )
    }
}

export default UserMail;