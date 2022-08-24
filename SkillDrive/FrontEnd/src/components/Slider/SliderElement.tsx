import React from 'react'
import { FeedbackItem } from '../../interfaces/FeedbackItem'

function SliderElement(props: { element: FeedbackItem }) {
  return (
    <div className='element__wrapper'>
      <div className='element__image'><img src={props.element.image} alt="Фотография пользователя" /></div>
      <div className='element__description'>
        <div className='element__name'>{props.element.user.name}</div>
        <div className='element__from'>{props.element.user.town}</div>
        <div className='element__text'>{props.element.user.text}</div>
      </div>
    </div>
  )
}

export default SliderElement