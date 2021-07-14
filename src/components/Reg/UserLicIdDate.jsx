import React from "react";

class UserLicIdDate extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
    }
    
    onValueChange(event) {
        this.props.onChange(event);
    }
    
    render() {
        const userLicIdDate = this.props.userLicIdDate;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="licensetDate">Дата выдачи</label>
                    <input className="block-input__licence-date short calendar" type="date" id="userLicIdDate" name="userLicIdDate" value={userLicIdDate} onChange={this.onValueChange} placeholder="00.00.0000" maxLength="8"/>
                </div>
                <p className="block-input__error">Некорректная дата</p>
            </>
        )
    }
}

export default UserLicIdDate;