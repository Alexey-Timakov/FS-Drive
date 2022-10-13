import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCar } from '../../Actions/carSearchAction';

export default function CarComponent() {
  type Params = {
    id: string;
  }
  const params = useParams<Params>();
  const dispatch = useDispatch();
  useEffect(() => {
    const { id: carId } = params;
    dispatch(fetchCar(carId));
  })

  return (
    <>
      <div>CarComponent</div>
    </>
  )
}