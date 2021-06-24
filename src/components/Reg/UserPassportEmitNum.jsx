import * as React from "react";

class UserPassportEmitNum extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
    }
    
    onValueChange(event) {
        this.props.onChange(event);
    }
    
    render() {
        const userPassportEmitNum = this.props.userPassportEmitNum;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userPassportEmitNum">Код подразделения</label>
                    <input className="block-input__passport-emit-num short" type="text" id="userPassportEmitNum" name="userPassportEmitNum" value={userPassportEmitNum} onChange={this.onValueChange} placeholder="000-000" pattern="[0-9]{3}-[0-9]{3}" maxLength="6"/>
                </div>
                <p className="block-input__error">Некорректый код</p>
            </>
        )
    }
}

export default UserPassportEmitNum;