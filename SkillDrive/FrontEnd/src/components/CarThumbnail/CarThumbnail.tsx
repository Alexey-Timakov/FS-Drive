import React from 'react'
import { API_URL } from '../../http'
import { ICarThumbnail } from '../../Interfaces/ICarThumbnail';
import { Link } from "react-router-dom";

import "./CarThumbnail.scss";

export default function CarThumbnail({ car }: ICarThumbnail) {

  return (
    <Link to={`/cars/${car._id}`} >
      <div className='car-thumbnail__wrapper'>
        <img src={`${API_URL}/${car.primaryImageLink}`} />
        <div className='car-thumbnail__avatar'><img src={`${API_URL}/files/avatar/${car.user}`} /></div>
        <div className='car-thumbnail__info'>
          <div className='car-thumbnail__model'>{car.brand} {car.model}, {car.year}</div>
          <div className='car-thumbnail__price'>{car.price} &#8381;/сутки</div>
        </div>
      </div>
    </Link >
  )
}