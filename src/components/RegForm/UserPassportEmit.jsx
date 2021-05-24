import * as React from "react";

class UserPassportEmit extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userPassportEmit: ""};
    }
    
    onValueChange(event) {
        this.props.onUserPassportEmitChange(event.target.value);
    }
    render() {
        const userPassportEmit = this.props.userPassportEmit;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="passportEmitent">Кем выдан</label>
                    <input className="block-input__passport-emit" type="text" id="passportEmitent" name="passportEmitent" value={userPassportEmit} onChange={this.onValueChange} placeholder="Название органа выдавшего паспорт"/>
                </div>
            </>
        )
    }
}

export default UserPassportEmit;