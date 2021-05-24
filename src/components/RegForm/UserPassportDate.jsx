import * as React from "react";

class UserPassportDate extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userPassportDate: ""};
    }
    
    onValueChange(event) {
        this.props.onUserPassportDateChange(event.target.value);
    }
    render() {
        const userPassportDate = this.props.userPassportDate;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userPassportDate">Дата выдачи</label>
                    <input className="block-input__passport-date short calendar" type="date" id="userPassportDate" name="userPassportDate" value={userPassportDate} onChange={this.onValueChange} placeholder="00.00.0000"/>
                </div>
            </>
        )
    }
}

export default UserPassportDate;