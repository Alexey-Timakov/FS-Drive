import React, { useState } from 'react'

import { carCaterogies } from './CategoriesList';
import "./CarCategory.scss";
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../Interfaces/IState';
import { changeCarType } from "../../Actions/searchOptionsAction";

export default function CarCategory() {
  const [isModalActive, toggleModalActive] = useState<Boolean>(false);
  const selectedCategory = useSelector((state: IState) => state.searchOptions.carType.categoryName);
  const dispatch = useDispatch();

  const showModalWindow = () => {
    toggleModalActive(!isModalActive);
  }

  const changeSelectedCarCategory = (carType: string) => {
    dispatch(changeCarType(carType));
    toggleModalActive(false);
  }

  return (
    <div className='car-category__wrapper'>
      <div className='car-category__input-wrapper'>
        <div className='car-category__selected'>
          <div className='car-category__title'>Категория</div>
          <div className='car-category__name'>{selectedCategory}</div>
        </div>
        <div className='car-category__arrow-down-button' onClick={() => showModalWindow()}>
          <i className='icon-arrow-down'></i>
        </div>
      </div>
      {isModalActive && <div className='car-category__modal-wrapper'>
        {carCaterogies.map(item => {
          return (
            <div key={item.categoryName} className='car-category__variant-wrapper' onClick={() => changeSelectedCarCategory(item.categoryName)}>
              <div className='car-category__variant-description'>
                <div className='car-category__variant-name'>{item.categoryName}</div>
                <div className='car-category__variant-class'>{item.categoryClass}</div>
              </div>
              <div className='car-category__tick'>
                {item.categoryName === selectedCategory &&
                  <i className='icon-tick'></i>}
              </div>
            </div>
          )
        })}
      </div>}
    </div>
  )
}
