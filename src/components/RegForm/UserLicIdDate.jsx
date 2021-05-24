import * as React from "react";

class UserLicIdDate extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userLicIdDate: ""};
    }
    
    onValueChange(event) {
        this.props.onUserLicIdDateChange(event.target.value);
    }
    render() {
        const userLicIdDate = this.props.userLicIdDate;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="licensetDate">Дата выдачи</label>
                    <input className="block-input__licence-date short calendar" type="date" id="userLicIdDate" name="userLicIdDate" value={userLicIdDate} onChange={this.onValueChange} placeholder="00.00.0000"/>
                </div>
            </>
        )
    }
}

export default UserLicIdDate;