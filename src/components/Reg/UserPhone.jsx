import React from "react";

class UserPhone extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
    }
    
    onValueChange(event) {
        this.props.onChange(event);
    }
    
    render() {
        const userPhone = this.props.userPhone;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userPhone">Телефон</label>
                    <input className="block-input__phone short" type="tel" id="userPhone" name="userPhone" value={userPhone} onChange={this.onValueChange} placeholder="8 900 000-00-00" pattern="[8] [0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}" maxLength="11"/>
                </div>
                <p className="block-input__error">Некорректный номер</p>
            </>
        )
    }
}

export default UserPhone;