import * as React from "react";

class UserBirth extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userBirth: ""};
    }
    
    onValueChange(event) {
        this.props.onUserBirthChange(event.target.value);
    }
    render() {
        const userBirth = this.props.userBirth;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userBirth">Дата рождения</label>
                    <input className="block-input__date short calendar" type="date" id="userBirth" name="userBirth" value={userBirth} onChange={this.onValueChange} placeholder="01.01.1970" maxLength="8"/>
                </div>

            </>
        )
    }
}

export default UserBirth;