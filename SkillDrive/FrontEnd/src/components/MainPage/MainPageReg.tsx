import React from 'react'
import SearchPanel from '../SearchPanel/SearchPanel';
import DefaultCarsList from '../MainPage/DefaultCarsList';
import "./MainPageReg.scss";

export default function MainPageReg() {
  return (
    <>
      <h1 className='main-page-reg__title'>Арендуйте автомобиль</h1>
      <SearchPanel />
      <DefaultCarsList />
    </>
  )
}
