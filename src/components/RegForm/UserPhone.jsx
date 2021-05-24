import * as React from "react";

class UserPhone extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userPhone: ""};
    }
    
    onValueChange(event) {
        this.props.onUserPhoneChange(event.target.value);
    }
    render() {
        const userPhone = this.props.userPhone;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userPhone">Телефон</label>
                    <input className="block-input__phone short" type="tel" id="userPhone" name="userPhone" value={userPhone} onChange={this.onValueChange} placeholder="+7 900 000-00-00" pattern="[+7] [0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}"/>
                </div>
            </>
        )
    }
}

export default UserPhone;