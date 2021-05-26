import * as React from "react";

class UserLicId extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userLicId: ""};
    }
    
    onValueChange(event) {
        this.props.onUserLicIdChange(event.target.value);
    }
    render() {
        const userLicId = this.props.userLicId;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="licenseNumber">Серия и номер</label>
                    <input className="block-input__licence-num short" type="text" id="userLicId" name="userLicId" value={userLicId} onChange={this.onValueChange} placeholder="0000 000000" pattern="[0-9]{4} [0-9]{6}" maxLength="10"/>
                </div>
            </>
        )
    }
}

export default UserLicId;