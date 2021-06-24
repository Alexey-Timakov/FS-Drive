import * as React from "react";

class UserPassportEmit extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
    }
    
    onValueChange(event) {
        this.props.onChange(event);
    }
    
    render() {
        const userPassportEmit = this.props.userPassportEmit;
        return (
            <>
                <div className="block-input__wrapper">
                    <label htmlFor="userPassportEmit">Кем выдан</label>
                    <input className="block-input__passport-emit" type="text" id="userPassportEmit" name="userPassportEmit" value={userPassportEmit} onChange={this.onValueChange} placeholder="Название органа выдавшего паспорт"/>
                </div>
                <p className="block-input__error">Некорректное значение</p>
            </>
        )
    }
}

export default UserPassportEmit;