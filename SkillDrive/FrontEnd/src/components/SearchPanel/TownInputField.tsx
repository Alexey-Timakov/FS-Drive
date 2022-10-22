import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../Interfaces/IState';
import { changeTownName, searchTowns } from "../../Actions/searchOptionsAction";

import "./TownInputField.scss";

export default function TownInputField() {
  const dispatch = useDispatch();
  const [isModalActive, toggleModalActive] = useState<Boolean>(false);
  const townVariants = useSelector((state: IState) => state.searchOptions.townVariants);
  const townName = useSelector((state: IState) => state.searchOptions.town);

  const onTownNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTownName = event.target.value;
    dispatch(changeTownName(newTownName));

    if (newTownName.length >= 2) {
      dispatch(searchTowns(newTownName));
    }
  }

  const changeSelectedTown = (townName: string) => {
    dispatch(changeTownName(townName));
    toggleModalActive(false);
  }

  useEffect(() => {
    if (townVariants.length >= 2) {
      toggleModalActive(true);
    }
  }, [townVariants]);

  useEffect(() => {
    toggleModalActive(false);
  }, []);

  return (
    <div className='town__wrapper'>
      <div className='town__selected'>
        <label className='town__title' htmlFor="townName">Местоположение</label>
        <input className="town__name" type="text" id="townName" name="townName" value={townName} onChange={onTownNameChange} placeholder="" />
      </div>
      {isModalActive && <div className='town__modal-wrapper'>
        {townVariants.map(item => {
          return (
            <div key={item.townName} className='town__variant-wrapper' onClick={() => changeSelectedTown(item.townName)}>
              <div className='town__variant-name'>{item.townName}</div>
              <div className='town__variant-state'>{item.townState}</div>
            </div>
          )
        })}
      </div>}
    </div>
  )
}
