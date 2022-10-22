import React from 'react'
import { API_URL } from '../../http';
import { IFeedbackComponent } from '../../Interfaces/ICarFeedback'
import "./Feedback.scss";

export default function Feedback({ feedback }: IFeedbackComponent) {
  const name = feedback.name.split(" ")[0];
  const surname = feedback.name.split(" ").pop().slice(0, 1).concat(".");
  return (
    <div className='feedback__wrapper'>
      <div className='feedback__header'>
        <div className='feedback__avatar'><img src={`${API_URL}/files/avatar/${feedback.userId}`} /></div>
        <div className='feedback__info'>
          <div className='name'>{name} {surname}</div>
          <div className='date'>{feedback.date}</div>
        </div>
      </div>
      <div className='feedback__text'>{feedback.text}</div>
    </div>
  )
}
