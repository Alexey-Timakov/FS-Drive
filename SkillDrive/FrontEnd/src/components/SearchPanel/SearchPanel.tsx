import React from 'react'

import CarCategory from '../SearchPanel/CarCategory';
import TownInputField from './TownInputField';

import "./SearchPanel.scss";

export default function SearchPanel() {
  return (
    <div className='search-panel__wrapper'>
      <div className='input-panel__wrapper'>
        <TownInputField />
        <div>Calendar</div>
        <CarCategory />
      </div>
      <div>Search Button</div>
    </div>
  )
}
