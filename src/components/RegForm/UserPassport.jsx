import * as React from "react";

class UserPassport extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userPassport: ""};
    }
    
    onValueChange(event) {
        this.props.onUserPassportChange(event.target.value);
    }
    render() {
        const userPassport = this.props.userPassport;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="passportNumber">Серия и номер</label>
                    <input className="block-input__passport short" type="number" id="userPassport" name="userPassport" value={userPassport} onChange={this.onValueChange} placeholder="0000 000000" pattern="[0-9]{4} [0-9]{6}"/>
                </div>
            </>
        )
    }
}

export default UserPassport;