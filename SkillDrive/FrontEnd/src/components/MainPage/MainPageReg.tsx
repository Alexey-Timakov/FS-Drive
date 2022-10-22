import React, { useRef } from 'react'
import SearchPanel from '../SearchPanel/SearchPanel';
import DefaultCarsList from '../MainPage/DefaultCarsList';
import { fetchCars } from '../../Actions/carSearchAction';
import { ICarSearchBody } from '../../Interfaces/ICarSearchOptions';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../Interfaces/IState';
import { useHistory } from "react-router-dom";
import "./MainPageReg.scss";

export default function MainPageReg() {
  const history = useHistory();
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
    history.push("/cars/search");
  }

  return (
    <>
      <h1 className='main-page-reg__title'>Арендуйте автомобиль</h1>
      <div className='main-page-reg__search-wrapper'>
        <SearchPanel />
        <button ref={searchButton} className='search-btn' onClick={(e) => searchCars(e)}>Найти</button>
      </div>
      <DefaultCarsList />
    </>
  )
}
