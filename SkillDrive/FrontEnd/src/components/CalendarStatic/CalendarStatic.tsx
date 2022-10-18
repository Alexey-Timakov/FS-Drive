import React, { useEffect, useState } from 'react'
import classnames from 'classnames';
import { ICalendarStatic } from '../../interfaces/Calendar';
import "./CalendarStatic.scss";
import { useSelector } from 'react-redux';
import { IState } from '../../Interfaces/IState';

function CalendarStatic({ monthToShow }: ICalendarStatic) {
  const monthNames: string[] = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const dayNames: string[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",];
  const maxDaysInMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const monthName = monthNames[monthToShow.getMonth()];
  const yearNumber = monthToShow.getFullYear();

  const orderedDates = useSelector((state: IState) => state.cars.fetchedCar.orderedDates);
  const firstEndDates = [orderedDates[0], orderedDates[orderedDates.length - 1]];
  const middleDates = orderedDates.slice(1, -1);

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

  const showOrderedDays = (item: string): Boolean => {
    if (middleDates.findIndex((dates) => {
      const day = +dates.split(".")[0];
      const month = +dates.split(".")[1];
      const year = +dates.split(".")[2];
      const result = +item === day && month === monthToShow.getMonth() + 1 && year === monthToShow.getFullYear()
      return result
    }) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  const showFirstLastDays = (item: string): Boolean => {
    if (firstEndDates.findIndex((dates) => {
      const day = +dates.split(".")[0];
      const month = +dates.split(".")[1];
      const year = +dates.split(".")[2];
      const result = +item === day && month === monthToShow.getMonth() + 1 && year === monthToShow.getFullYear()
      return result
    }) !== -1) {
      return true;
    } else {
      return false;
    }
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

  const [year, month] = getMonthAndYearNumbers(monthToShow);

  const matrix = generateMatrix(monthToShow);

  return (
    <div className={classnames({
      'calendar-static__wrapper': true,
    })}>
      <div className='calendar-static__block'>
        <div className='calendar-static__month-year'>
          {monthName} {yearNumber}
        </div>
        <div className='calendar-static__items'>
          {matrix.map((row, rowIndex) => {
            const rowItems = row.map((item, itemIndex) => {

              const colClasses = classnames({
                'week_day_names': rowIndex === 0,
                'active_days': item !== "-1" && rowIndex !== 0,
                'hidden_days': item === "-1",
                'busy_days': showOrderedDays(item),
                'first_day': showFirstLastDays(item),
                'last_day': showFirstLastDays(item),
              });

              return <div className={colClasses} key={itemIndex}>{item}</div>
            })
            const rowClasses = classnames({
              'week': true,
            })
            return <div className={rowClasses} key={rowIndex}>{rowItems}</div>
          })}
        </div>
      </div>
    </div>
  )
}

export default CalendarStatic