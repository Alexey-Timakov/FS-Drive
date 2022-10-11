import React from 'react'

import CarCategory from '../SearchPanel/CarCategory';
import TownInputField from './TownInputField';
import DateInputField from './DateInputField';

import "./SearchPanel.scss";

export default function SearchPanel() {
  const searchCars = () => {

  }

  return (
    <div className='search-panel__wrapper'>
      <div className='input-panel__wrapper'>
        <TownInputField />
        <DateInputField />
        <CarCategory />
      </div>
      <div className='search-panel__btn' onClick={searchCars}>Найти</div>
    </div>
  )
}
