import * as React from "react";

class UserPassportEmitNum extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {userPassportEmitNum: ""};
    }
    
    onValueChange(event) {
        this.props.onUserPassportEmitNumChange(event.target.value);
    }
    render() {
        const userPassportEmitNum = this.props.userPassportEmitNum;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="emitentNumber">Код подразделения</label>
                    <input className="block-input__passport-emit-num short" type="text" id="userPassportEmitNum" name="userPassportEmitNum" value={userPassportEmitNum} onChange={this.onValueChange} placeholder="000-000" pattern="[0-9]{3}-[0-9]{3}" maxLength="6"/>
                </div>
            </>
        )
    }
}

export default UserPassportEmitNum;