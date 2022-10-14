import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCar } from '../../Actions/carSearchAction';
import { IState } from '../../Interfaces/IState';
import CarGallery from '../CarGallery/CarGallery';
import "./CarComponent.scss";

export default function CarComponent() {
  type Params = {
    id: string;
  };
  const params = useParams<Params>();
  const carOwnerId: string = useSelector((state: IState) => state.cars.fetchedCar.user);
  const images: string[] = useSelector((state: IState) => state.cars.fetchedCar.imagesLinks);
  const dispatch = useDispatch();

  useEffect(() => {
    const { id: carId } = params;
    dispatch(fetchCar(carId));
  })

  useEffect(() => {

  }, [carOwnerId]);

  return (
    <>
      <div>Back btn</div>
      {images &&
        <CarGallery images={images} />
      }
      <div>Description block
        <div>Car
          <div>Title</div>
          <div>Price</div>
          <div>Featues</div>
        </div>
        <div>Owner
          <div>Photo</div>
          <div>Info</div>
          <div>Link to User</div>
        </div>
      </div>
      <div>Features block</div>
      <div>Calendar block</div>
      <div>Feedbacks</div>
    </>
  )
}