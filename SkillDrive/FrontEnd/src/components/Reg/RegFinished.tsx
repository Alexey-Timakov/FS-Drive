import React from 'react'
import { useHistory } from "react-router-dom";

import confirmation from "./Images/confirmation.svg";

import "./RegFinished.scss";

export function RegFinished() {

  const history = useHistory();

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  }

  return (
    <div className='step'>
      <figure className="step__image">
        <img src={confirmation} alt="Успешное окончание процесса регистрации" />
      </figure>
      <h1 className='step__title_h2'>Успех!</h1>
      <p className='step__description'>Вы успешно зарегистрировались. Дождитесь проверки документов и начните пользоваться сервисом.</p>
      <div className="submit-footer__wrapper">
        <button className="submit-footer__button is-active" onClick={routeChange} >Перейти на главную</button>
      </div>
    </div>
  )
}