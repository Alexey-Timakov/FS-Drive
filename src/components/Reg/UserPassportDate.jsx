import * as React from "react";

class UserPassportDate extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
    }
    
    onValueChange(event) {
        this.props.onChange(event);
    }
    render() {
        const userPassportDate = this.props.userPassportDate;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userPassportDate">Дата выдачи</label>
                    <input className="block-input__passport-date short calendar" type="date" id="userPassportDate" name="userPassportDate" value={userPassportDate} onChange={this.onValueChange} placeholder="00.00.0000" maxLength="8"/>
                </div>
                <p className="block-input__error">Некорректная дата</p>
            </>
        )
    }
}

export default UserPassportDate;