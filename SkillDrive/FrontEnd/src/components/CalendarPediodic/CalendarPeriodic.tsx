import React, { useEffect, useState } from 'react'
import classnames from 'classnames';
import chevronLeft from './chevron-left.svg';
import chevronRight from './chevron-right.svg';
import validator from "validator";

import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../Interfaces/IState';
import { changeStartDate, changeEndDate } from '../../Actions/searchOptionsAction';

import "./CalendarPeriodic.scss";

function CalendarPeriodic() {
  const monthNames: string[] = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const dayNames: string[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",];
  const maxDaysInMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [clickCounter, setClickCounter] = useState<number>(0);

  const selectedStartDate = useSelector((state: IState) => state.searchOptions.dates.dateStart);
  const selectedEndDate = useSelector((state: IState) => state.searchOptions.dates.dateEnd);

  const dispatch = useDispatch();

  const convertDateToNumber = (date: string): number => {
    const [day, month, year] = date.split(".");
    const result = Date.parse([month, day, year].join("."));
    return result
  }

  const getMaxDaysInMonth = (year: number, month: number): number => {
    let maxDays: number = maxDaysInMonth[month];
    if (month === 1) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDays += 1;
      }
    }
    return maxDays;
  }

  const getFirstDayOfMonth = (date: Date): number => {
    const firstDay: number = new Date(year, month, 1).getDay();
    return firstDay;
  }

  const getMonthAndYearNumbers = (date: Date): number[] => {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();

    return [year, month];
  }

  const showSelectedStartDate = (item: string): Boolean => {
    const result: boolean = +item === +selectedStartDate.split(".")[0] &&
      (month + 1) === +selectedStartDate.split(".")[1] &&
      year === +selectedStartDate.split(".")[2]
    return result;
  }

  const showSelectedEndDate = (item: string): Boolean => {
    const result: boolean = +item === +selectedEndDate.split(".")[0] &&
      (month + 1) === +selectedEndDate.split(".")[1] &&
      year === +selectedEndDate.split(".")[2]
    return result;
  }

  const showSelectedPeriod = (item: string): Boolean => {
    const dateToNumber = convertDateToNumber([item, month + 1, year].join("."));
    const selectedStartDateToNumber = convertDateToNumber(selectedStartDate);
    const selectedEndDateToNumber = convertDateToNumber(selectedEndDate);

    return item !== "-1" && dateToNumber > selectedStartDateToNumber && dateToNumber < selectedEndDateToNumber
  }

  const showTodaydDate = (item: string): Boolean => {
    const today = new Date();
    const result: boolean = +item === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    return result;
  }

  const generateMatrix = (date: Date): string[][] => {
    const maxDays = getMaxDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(date);

    const maxtrix = [] as string[][];
    maxtrix[0] = dayNames.map(item => item.toLowerCase());
    let counter: number = 1;

    for (let row = 1; row < 7; row++) {
      if (counter <= maxDays) {
        maxtrix[row] = [];
      } else {
        break;
      }
      for (let col = 1; col <= 7; col++) {
        maxtrix[row][col] = "-1";
        if (row === 1 && col >= firstDay) {
          maxtrix[row][col] = (counter++).toString();
        } else if (row > 1 && counter <= maxDays) {
          maxtrix[row][col] = (counter++).toString();
        }
      }
    }
    return maxtrix;
  }

  const changeMonth = (increment: number): void => {
    const newMonth = month + increment;
    setActiveDate(new Date(activeDate.setMonth(newMonth)));
  }

  const changeYear = (increment: number): void => {
    const newYar = year + increment;
    setActiveDate(new Date(activeDate.setFullYear(newYar)));
  }

  const changeSelectedDate = (day: number, month: number, year: number): void => {

    if (day === -1) return;

    else {
      const dayNum = day < 10 ? `0${day}` : day;
      const monthNum = (month + 1) < 10 ? `0${month + 1}` : month + 1;

      const clickedDateToString = [dayNum, monthNum, year].join(".");
      const clickedDateToNumber = convertDateToNumber([day, month + 1, year].join("."));
      const selectedStartDateToNumber = convertDateToNumber(selectedStartDate);
      if (clickCounter === 0 || clickedDateToNumber < selectedStartDateToNumber) {
        dispatch(changeStartDate(clickedDateToString));
        setClickCounter(1);
        return;
      }
      else {
        dispatch(changeEndDate(clickedDateToString));
        setClickCounter(0);
      }
    }
  }

  useEffect(() => {
    if (validator.isDate(selectedStartDate, { format: "DD/MM/YYYY", delimiters: [".", "/", "-"] })) {
      const inputDateToArrayOfStrings = selectedStartDate.split(".");
      const day = +inputDateToArrayOfStrings[0];
      const month = +inputDateToArrayOfStrings[1] - 1;
      const year = +inputDateToArrayOfStrings[2];
      changeSelectedDate(day, month, year);
    }
  }, [])

  const closeCalendar = (event: React.MouseEvent<HTMLElement>) => {
    const calendar: HTMLElement = event.currentTarget.parentElement;
    calendar.classList.remove("active");
  }

  const [year, month] = getMonthAndYearNumbers(activeDate);

  const matrix = generateMatrix(activeDate);

  return (
    <div className={classnames({
      'calendar-periodic__wrapper': true,
      'active': false,
    })}>
      <div className='calendar-periodic__block'>
        <div className='calendar-periodic__buttons'>
          <div className='button__wrapper'>
            <div className='button__chevron button__chevron_left'>
              <img src={chevronLeft} onClick={() => changeMonth(-1)} />
            </div>
            <div className='button__text'>
              {monthNames[month]}
            </div>
            <div className='button__chevron button__chevron_right'>
              <img src={chevronRight} onClick={() => changeMonth(+1)} />
            </div>
          </div>
          <div className='button__wrapper'>
            <div className='button__chevron button__chevron_left'>
              <img src={chevronLeft} onClick={() => changeYear(-1)} />
            </div>
            <div className='button__text button__text_short'>
              {year}
            </div>
            <div className='button__chevron button__chevron_right'>
              <img src={chevronRight} onClick={() => changeYear(+1)} />
            </div>
          </div>
        </div>
        <div className='calendar-periodic__items'>
          {matrix.map((row, rowIndex) => {
            const rowItems = row.map((item, itemIndex) => {

              const colClasses = classnames({
                'week_day_names': rowIndex === 0,
                'active_days': item !== "-1" && rowIndex !== 0,
                'hidden_days': item === "-1",
                'current_day': showTodaydDate(item),
                'selected_days': showSelectedStartDate(item) || showSelectedEndDate(item),
                'selected_period': showSelectedPeriod(item)
              });

              return <div className={colClasses} onClick={() => (changeSelectedDate(+item, month, year))} key={itemIndex}>{item}</div>
            })
            const rowClasses = classnames({
              'week': true,
            })
            return <div className={rowClasses} key={rowIndex}>{rowItems}</div>
          })}
        </div>
      </div>
      <div className='calendar-periodic__fade' onClick={closeCalendar}></div>
    </div>
  )
}

export default CalendarPeriodic;