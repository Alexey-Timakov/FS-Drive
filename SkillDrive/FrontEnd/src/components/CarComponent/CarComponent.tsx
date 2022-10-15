import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCar } from '../../Actions/carSearchAction';
import { CarInfo } from '../../Interfaces/ICarSearchResults';
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
  const carDetails: CarInfo = useSelector((state: IState) => state.cars.fetchedCar);

  const dispatch = useDispatch();

  useEffect(() => {
    const { id: carId } = params;
    dispatch(fetchCar(carId));
  })

  useEffect(() => {

  }, [carOwnerId]);

  return (
    <div className='car-info__wrapper'>
      <div className='car-info__header'>
        <Link to={`/cars/`} >
          <i className='icon-arrow-left'><span>Назад</span></i>
        </Link>
      </div>
      {
        images &&
        <CarGallery images={images} />
      }
      {carDetails.prices && <div>
        <div className='car-info__main-description'>
          <div className='car-info__car'>
            <div className='car-info__car-title'>{carDetails.brand} {carDetails.model}, {carDetails.year}</div>
            <div className='car-info__car-prices'>
              <div className='car-info__price'>
                <div className='car-info__price-value'>{carDetails.prices.priceUsual} &#8381;/сут.</div>
                <div className='car-info__price-description'>обычная оренда</div>
              </div>
              <div className='car-info__price'>
                <div className='car-info__price-value'>{carDetails.prices.price3Days} &#8381;/сут.</div>
                <div className='car-info__price-description'>при аренде на 3 дня</div>
              </div>
              <div className='car-info__price'>
                <div className='car-info__price-value'>{carDetails.prices.price5Days} &#8381;/сут.</div>
                <div className='car-info__price-description'>при аренде на 5 дней</div>
              </div>
            </div>
            <div className='car-info__features'>
              <h2>Характеристики</h2>
              <div className='car-info__feature'>
                <div className='feature__title'>Год выпуска</div>
                <div className='feature__value'>{carDetails.year}</div>
              </div>
              <div className='car-info__feature'>
                <div className='feature__title'>Кузов</div>
                <div className='feature__value'>{carDetails.bodyType}</div>
              </div>
              <div className='car-info__feature'>
                <div className='feature__title'>Двигатель</div>
                <div className='feature__value'>{carDetails.engine.size} л / {carDetails.engine.brakePower} л.с. / {carDetails.engine.fuelType} </div>
              </div>
              <div className='car-info__feature'>
                <div className='feature__title'>Трансмиссия</div>
                <div className='feature__value'>{carDetails.transmission}</div>
              </div>
              <div className='car-info__feature'>
                <div className='feature__title'>Привод</div>
                <div className='feature__value'>{carDetails.drivingWheelType}</div>
              </div>
              <div className='car-info__feature'>
                <div className='feature__title'>Пробег</div>
                <div className='feature__value'>{carDetails.totalMileage}</div>
              </div>
            </div>
          </div>
          <div className='car-info__owner'>Owner
            <div>Photo</div>
            <div>Info</div>
            <div>Link to User</div>
          </div>
        </div>
        <div>Features block</div>
        <div>Calendar block</div>
      </div>}
      <div>Feedbacks</div>
    </div>
  )
}