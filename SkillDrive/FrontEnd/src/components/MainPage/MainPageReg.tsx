import React from 'react'
import SearchPanel from '../SearchPanel/SearchPanel';
import DefaultCarsList from '../MainPage/DefaultCarsList';
import "./MainPageReg.scss";
import { useSelector } from 'react-redux';
import { IState } from '../../Interfaces/IState';
import SearchResultPage from '../SearchResultPage/SearchResultPage';

export default function MainPageReg() {
  const isUserExecutedSearch = useSelector((state: IState) => state.cars.isSearchExecuted);

  return (
    <>
      <h1 className='main-page-reg__title'>Арендуйте автомобиль</h1>
      <SearchPanel />
      {!isUserExecutedSearch && <DefaultCarsList />}
      {isUserExecutedSearch && <SearchResultPage />}
    </>
  )
}
