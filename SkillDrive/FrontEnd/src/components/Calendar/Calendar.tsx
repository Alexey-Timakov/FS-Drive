import React, { useEffect, useState } from 'react'
import classnames from 'classnames';
import chevronLeft from './chevron-left.svg';
import chevronRight from './chevron-right.svg';

import { Calendar } from "../../interfaces/Calendar";

import "./Calendar.scss";

function Calendar({ styles }: Calendar) {
  const monthNames: string[] = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const dayNames: string[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",];
  const maxDaysInMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(null);

  const changeMonth = (increment: number): void => {
    const newMonth = month + increment;
    setActiveDate(new Date(activeDate.setMonth(newMonth)));
  }

  const changeYear = (increment: number): void => {
    const newYar = year + increment;
    setActiveDate(new Date(activeDate.setFullYear(newYar)));
  }

  const changeSelectedDate = (day: number): void => {
    if (day === -1) return;
    else {
      const newSelectedDate = new Date(year, month, day);
      setSelectedDate(newSelectedDate);
    }
  }

  const closeCalendar = (event: React.MouseEvent<HTMLElement>) => {
    const calendar: HTMLElement = event.currentTarget.parentElement;
    calendar.classList.remove("active");
  };

  const getMaxDaysInMonth = (year: number, month: number): number => {
    let maxDays: number = maxDaysInMonth[month];
    if (month === 1) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDays += 1;
      }
    }
    return maxDays;
  };

  const getFirstDayOfMonth = (date: Date): number => {
    const firstDay: number = new Date(year, month, 1).getDay();
    return firstDay;
  };

  const getMonthAndYearNumbers = (date: Date): number[] => {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();

    return [year, month];
  }

  const showSelectedDate = (item: string): Boolean => {
    const result: boolean = +item === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    return result;
  }

  const [year, month] = getMonthAndYearNumbers(activeDate);

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
  };

  const matrix = generateMatrix(activeDate);

  return (
    <div className={classnames({
      'calendar__wrapper': true,
      'active': false,
    })}>
      <div style={styles} className='calendar__block'>
        <div className='calendar__buttons'>
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
        <div className='calendar__items'>
          {matrix.map((row, rowIndex) => {
            const rowItems = row.map((item, itemIndex) => {

              const colClasses = classnames({
                'week_day_names': rowIndex === 0,
                'active_days': item !== "-1" && rowIndex !== 0,
                'hidden_days': item === "-1",
                'current_day': +item === activeDate.getDate(),
                'selected_days': selectedDate && showSelectedDate(item),
              });

              return <div className={colClasses} onClick={() => (changeSelectedDate(+item))} key={itemIndex}>{item}</div>
            })
            const rowClasses = classnames({
              'week': true,
            })
            return <div className={rowClasses} key={rowIndex}>{rowItems}</div>
          })}
        </div>
      </div>
      <div className='calendar__fade' onClick={closeCalendar}></div>
    </div>
  )
}

export default Calendar