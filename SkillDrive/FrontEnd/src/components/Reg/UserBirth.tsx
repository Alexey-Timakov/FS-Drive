import React, { useState, useEffect } from "react";

function UserBirth ({addUserInfoToState}) {
    const STORE_TITLE = "userBirth";
    const [userBirth, userInputChange] = useState("1980-02-12");

    const today = new Date();
    const todayArray = today.toISOString().split("T")[0].split("-");
    
    const currentYear = todayArray[0];
    const minAgeForDrivingInYears = 18;
    const maxYearNumber = +currentYear - minAgeForDrivingInYears;
    todayArray[0] = maxYearNumber.toString();
    
    let currentDate = +todayArray[2];
    const currentHours = today.getHours();
    const currentOffset = -today.getTimezoneOffset() / 60;
    
    if (currentOffset > currentHours) {
        currentDate +=1;
    }
    const newCurrentDate = currentDate < 10 ? `0${currentDate}` : `${currentDate}`;
    todayArray[2] = newCurrentDate;
    
    const maxDateString = todayArray.join("-");

    const onValueChange = (event) => {
        console.log(event.target.value);
        userInputChange(event.target.value);
    }

    useEffect(() => {
        addUserInfoToState(STORE_TITLE, userBirth);
    })

    return (
            <>
                <div className="block-input__wrapper">
                    <div className="block-input__input">
                        <label htmlFor="userBirth">Дата рождения</label>
                        <input className="block-input__date short calendar" type="date" id="userBirth" name="userBirth" value={userBirth} onChange={onValueChange} max={maxDateString}/>
                    </div>
                    <p className="block-input__error">Некорректная дата</p>
                </div>
            </>
   
    )
}
export default UserBirth;