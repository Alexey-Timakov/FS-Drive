import React, { useEffect, useRef } from 'react'

import CarCategory from '../SearchPanel/CarCategory';
import TownInputField from './TownInputField';
import DateInputField from './DateInputField';

import "./SearchPanel.scss";
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../Interfaces/IState';
import { fetchCars } from '../../Actions/carSearchAction';
import { ICarSearchBody } from '../../Interfaces/ICarSearchOptions';

export default function SearchPanel() {
  const dispatch = useDispatch();
  const searchButton = useRef<HTMLButtonElement>(null);
  const town = useSelector((state: IState) => state.searchOptions.town);
  const dates = useSelector((state: IState) => state.searchOptions.dates);
  const carCategory = useSelector((state: IState) => state.searchOptions.categoryName);

  const searchCars = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const searchBody: ICarSearchBody = {
      town,
      dates: [dates.dateStart, dates.dateEnd],
      categoryName: carCategory
    };

    dispatch(fetchCars(searchBody));
  }

  return (
    <div className='search-panel__wrapper'>
      <div className='input-panel__wrapper'>
        <TownInputField />
        <DateInputField />
        <CarCategory />
      </div>
      <button ref={searchButton} className='search-panel__btn' onClick={(e) => searchCars(e)}>Найти</button>
    </div>
  )
}
