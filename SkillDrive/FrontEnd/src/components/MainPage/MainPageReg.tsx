import React from 'react'
import SearchPanel from '../SearchPanel/SearchPanel';
import DefaultCarsList from '../MainPage/DefaultCarsList';

export default function MainPageReg() {
  return (
    <>
      <h1>Арендуйте автомобиль</h1>
      <SearchPanel />
      <DefaultCarsList />
    </>
  )
}
