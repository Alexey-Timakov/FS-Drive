import React, { ChangeEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../Interfaces/IState';
import { changeTownName } from "../../Actions/searchOptionsAction";

import "./TownInputField.scss";

export default function TownInputField() {
  const dispatch = useDispatch();
  // const [townName, changeTonwName] = useState<string>("");
  const [isModalActive, toggleModalActive] = useState<Boolean>(false);
  const townVariants = useSelector((state: IState) => state.searchOptions.townVariants);
  const townName = useSelector((state: IState) => state.searchOptions.town);

  const onTownNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTownName = event.target.value;
    // changeTonwName(newTownName);
    dispatch(changeTownName(newTownName));
  }

  const changeSelectedTown = (townName: string) => {
    dispatch(changeTownName(townName));
  }

  return (
    <div className='town__wrapper'>
      <div className='town__selected'>
        <label className='town__title' htmlFor="townName">Местоположение</label>
        <input className="town__name" type="text" id="townName" name="townName" value={townName} onChange={onTownNameChange} placeholder="" />
      </div>
      {isModalActive && <div className='town__modal-wrapper'>
        {townVariants.map(item => {
          return (
            <div key={item.townName} className='town__variant-wrapper'>
              <div className='town__variant-name'>{item.townName}</div>
              <div className='town__variant-state'>{item.townState}</div>
            </div>
          )
        })}
      </div>}
    </div>
  )
}
