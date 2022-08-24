import React, { useState, useEffect } from "react";
import Calendar from "../../Calendar/Calendar";

function UserInputDate({ addUserInfoToState, inputName, inputTitle }) {
  const STORE_TITLE = inputName;
  const [userInputDate, userInputChange] = useState("10.01.1900");

  const modifyUserInputDate = (inputDate: string): string => {
    const inputStringOfNumbers: string = inputDate.replace(/[^\d]/g, "");

    let day: string = inputStringOfNumbers.slice(0, 2);
    if (+day[0] > 3) day = "0".concat(day[0]);
    if (+day > 31) day = "31";
    let month: string = inputStringOfNumbers.slice(2, 4);
    if (+month[0] > 1) month = "0".concat(month[0]);
    const year: string = inputStringOfNumbers.slice(4, 8);

    let modifiedInputDate: string = "";

    if (inputStringOfNumbers.length !== 0) modifiedInputDate = day;
    if (inputStringOfNumbers.length >= 2) modifiedInputDate = modifiedInputDate.concat(".", month);
    if (inputStringOfNumbers.length >= 4) modifiedInputDate = modifiedInputDate.concat(".", year);

    return modifiedInputDate;
  }

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const modifiedInputDate = modifyUserInputDate(event.target.value);
    userInputChange(modifiedInputDate);
  }

  const onCalendarClick = (clickedDate: string) => {
    userInputChange(clickedDate);
  }

  const showCalendar = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const calendarWindow: Element = event.currentTarget.nextElementSibling;
    calendarWindow.classList.add("active");
  }

  useEffect(() => {
    addUserInfoToState(STORE_TITLE, userInputDate);
  }, [userInputDate])

  return (
    <>
      <div className="block-input__wrapper">
        <div className="block-input__input">
          <label htmlFor={inputName}>{inputTitle}</label>
          <input className="block-input__date short" type="text" id={inputName} name={inputName} value={userInputDate} onChange={onValueChange} />
          <a href="#" className="icon icon-short calendar" onClick={showCalendar} />
          <Calendar
            styles={{
            }}
            selectedFromInputDate={userInputDate}
            onCalendarClick={onCalendarClick} />
        </div>
        <p className="block-input__error">Некорректная дата</p>
      </div>
    </>

  )
}
export default UserInputDate;