import React, { useState, useEffect } from "react";
import Calendar from "../../Calendar/Calendar";

function UserBirth({ addUserInfoToState }) {
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
    currentDate += 1;
  }
  const newCurrentDate = currentDate < 10 ? `0${currentDate}` : `${currentDate}`;
  todayArray[2] = newCurrentDate;

  const maxDateString = todayArray.join("-");

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    userInputChange(event.target.value);
  }

  const showCalendar = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const calendarWindow: Element = event.currentTarget.nextElementSibling;
    calendarWindow.classList.add("active");
  }

  useEffect(() => {
    addUserInfoToState(STORE_TITLE, userBirth);
  })

  return (
    <>
      <div className="block-input__wrapper">
        <div className="block-input__input">
          <label htmlFor="userBirth">Дата рождения</label>
          <input className="block-input__date short" type="text" id="userBirth" name="userBirth" value={userBirth} onChange={onValueChange} max={maxDateString} />
          <a href="#" className="icon icon-short calendar" onClick={showCalendar} />
          <Calendar styles={{
            "position": "absolute",
            "left": "260px",
            "top": "100%",
          }}/>
        </div>
        <p className="block-input__error">Некорректная дата</p>
      </div>
    </>

  )
}
export default UserBirth;