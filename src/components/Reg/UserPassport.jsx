import React from "react";

class UserPassport extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
    }
    
    onValueChange(event) {
        this.props.onChange(event);
    }
    
    render() {
        const userPassport = this.props.userPassport;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="passportNumber">Серия и номер</label>
                    <input className="block-input__passport short" type="text" id="userPassport" name="userPassport" value={userPassport} onChange={this.onValueChange} placeholder="0000 000000" pattern="[0-9]{4} [0-9]{6}" maxLength="10"/>
                </div>
                <p className="block-input__error">Некорректные серия или номер</p>
            </>
        )
    }
}

export default UserPassport;