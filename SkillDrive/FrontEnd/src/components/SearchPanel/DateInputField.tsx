import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../Interfaces/IState';
import { changeStartDate, changeEndDate } from "../../Actions/searchOptionsAction";

import "./DateInputField.scss";
import CalendarPeriodic from '../CalendarPediodic/CalendarPeriodic';

export default function DateInputField() {
  const dispatch = useDispatch();
  const [placeHolderStartDate, setPlaceholderStartDate] = useState<string>(null);
  const [placeHolderEndDate, setPlaceholderEndDate] = useState<string>(null);

  const selectedStartDate = useSelector((state: IState) => state.searchOptions.dates.dateStart);
  const selectedEndDate = useSelector((state: IState) => state.searchOptions.dates.dateEnd);

  const modifyUserInputDate = (inputDate: string): string => {
    const inputStringOfNumbers: string = inputDate.replace(/[^\d]/g, "");

    let day: string = inputStringOfNumbers.slice(0, 2);
    if (+day[0] > 3) day = "0".concat(day[0]);
    if (+day > 31) day = "31";
    let month: string = inputStringOfNumbers.slice(2, 4);
    if (+month[0] > 1) month = "0".concat(month[0]);
    if (+month > 12) month = "12";
    const year: string = inputStringOfNumbers.slice(4, 8);

    let modifiedInputDate: string = "";

    if (inputStringOfNumbers.length !== 0) modifiedInputDate = day;
    if (inputStringOfNumbers.length >= 2) modifiedInputDate = modifiedInputDate.concat(".", month);
    if (inputStringOfNumbers.length >= 4) modifiedInputDate = modifiedInputDate.concat(".", year);

    return modifiedInputDate;
  }

  const onSelectedStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const startInputDate = event.target.value;
    const modifiedStartInputDate = modifyUserInputDate(startInputDate);
    dispatch(changeStartDate(modifiedStartInputDate));
  }

  const onSelectedEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endInputDate = event.target.value;
    const modifiedEndtInputDate = modifyUserInputDate(endInputDate);
    dispatch(changeEndDate(modifiedEndtInputDate));
  }

  const showCalendar = (event: React.MouseEvent<HTMLElement>) => {
    const calendarWindow: Element = event.currentTarget.nextElementSibling;
    calendarWindow.classList.add("active");
  }

  const convertDatetoShortString = (date: Date) => {
    let day = date.getDate().toString();
    if (+day[0] > 3) day = "0".concat(day[0]);
    let month = (date.getMonth() + 1).toString();
    if (+month[0] > 1) month = "0".concat(month[0]);
    if (+month > 12) month = "12";
    const year = date.getFullYear().toString();

    return `${day}.${month}.${year}`;
  }

  useEffect(() => {
    const today = new Date();
    const dateStart = convertDatetoShortString(today);
    dispatch(changeStartDate(dateStart));
    setPlaceholderStartDate(dateStart);
    const dateEnd = dateStart;
    dispatch(changeEndDate(dateEnd));
    setPlaceholderEndDate(dateEnd);
  }, []);

  return (
    <div className='date__wrapper'>
      <div className='date__selected'>
        <label className='date__title'>Период аренды</label>
        <div className='date__dates'>
          <input className="date__name" type="text" id="dateStart" name="dateStart" value={selectedStartDate} onChange={onSelectedStartDateChange} placeholder={placeHolderStartDate} />
          <span> - </span>
          <input className="date__name" type="text" id="dateEnd" name="dateEnd" value={selectedEndDate} onChange={onSelectedEndDateChange} placeholder={placeHolderEndDate} />
        </div>
      </div>
      <div className='date__calendar-button' onClick={showCalendar}>
        <i className='icon-calendar'></i>
      </div>
      <CalendarPeriodic />
    </div>
  )
}
