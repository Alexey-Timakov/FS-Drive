import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCar } from '../../Actions/carSearchAction';
import { fetchCarOwner } from '../../Actions/carOwnerAction';
import { fetchUserFeedbacks } from '../../Actions/feedbackAction';
import { CarInfo, ICarOwnerData } from '../../Interfaces/ICarSearchResults';
import { IState } from '../../Interfaces/IState';
import { carFeaturesList } from './CarFeaturesList';
import CarGallery from '../CarGallery/CarGallery';
import CalendarStatic from '../CalendarStatic/CalendarStatic';
import Feedback from '../Feedback/Feedback';
import { API_URL } from '../../http';
import { IUserFeedback } from '../../Interfaces/IUserFeedback';
import "./CarComponent.scss";

export default function CarComponent() {
  type Params = {
    id: string;
  };
  const params = useParams<Params>();
  const { id: carId } = params;

  const currentMonth = new Date;
  const nextMonth = new Date;
  currentMonth.setDate(1);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(1);

  const carOwnerId: string = useSelector((state: IState) => state.cars.fetchedCar.user);
  const images: string[] = useSelector((state: IState) => state.cars.fetchedCar.imagesLinks);
  const carDetails: CarInfo = useSelector((state: IState) => state.cars.fetchedCar);
  const carOwnerData: ICarOwnerData = useSelector((state: IState) => state.cars.carOwnerData);
  const userFeedbacks: IUserFeedback[] = useSelector((state: IState) => state.cars.carOwnerData.feedbacks);

  const carOwnerName = carOwnerData.userName?.split(" ")[0];
  const carOwnerSurname = carOwnerData.userName?.split(" ").pop().slice(0, 1).toUpperCase();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCar(carId));
  }, [])

  useEffect(() => {
    if (carOwnerId) {
      dispatch(fetchCarOwner(carOwnerId));
      dispatch(fetchUserFeedbacks(carOwnerId))
    }
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
            <div className='car-info__information-wrapper'>
              <h2>Характеристики</h2>
              <div className='car-info__information'>
                <div className='info__title'>Год выпуска</div>
                <div className='info__value'>{carDetails.year}</div>
              </div>
              <div className='car-info__information'>
                <div className='info__title'>Кузов</div>
                <div className='info__value'>{carDetails.bodyType}</div>
              </div>
              <div className='car-info__information'>
                <div className='info__title'>Двигатель</div>
                <div className='info__value'>{carDetails.engine.size} л / {carDetails.engine.brakePower} л.с. / {carDetails.engine.fuelType} </div>
              </div>
              <div className='car-info__information'>
                <div className='info__title'>Трансмиссия</div>
                <div className='info__value'>{carDetails.transmission}</div>
              </div>
              <div className='car-info__information'>
                <div className='info__title'>Привод</div>
                <div className='info__value'>{carDetails.drivingWheelType}</div>
              </div>
              <div className='car-info__information'>
                <div className='info__title'>Пробег</div>
                <div className='info__value'>{carDetails.totalMileage} км</div>
              </div>
            </div>
          </div>
          {carOwnerData.id &&
            <div className='car-info__owner'>
              <div className='owner-avatar'>
                <img src={`${API_URL}/${carOwnerData.userAvatarLink}`} />
              </div>
              <div className='owner-name'>{carOwnerName} {carOwnerSurname}</div>
              <div className='owner-title'>Владелец</div>
              <div className='owner-link'><Link to={`/users/${carOwnerId}`}>Посмотреть профиль</Link></div>
            </div>
          }
        </div>
        <div className='car-info__features'>
          <h2>Опции</h2>
          <div className='car-info__features-wrapper'>
            {Object.keys(carDetails.features).map(item => {
              const queryIndex = carFeaturesList.findIndex(feature => feature.classId === item);
              if (queryIndex) {
                const iconClassname = carFeaturesList[queryIndex].className;
                const iconDescription = carFeaturesList[queryIndex].description;
                return (
                  <div className='car-info__feature-wrapper' key={item}>
                    <div className='car-info__icon'><i className={iconClassname}></i></div>
                    <div className='car-info__description'>{iconDescription}</div>
                  </div>
                )
              }
            })}
          </div>
        </div>
        <div className='car-info__availability'>
          <h2>Доступность</h2>
          <div className='car-info__calendars'>
            <CalendarStatic
              monthToShow={currentMonth} />
            <CalendarStatic
              monthToShow={nextMonth} />
          </div>
        </div>
      </div>}
      {userFeedbacks && <div className='car-info__feedbacks-wrapper'>
        <h2>Отзывы</h2>
        <div className='car-info__rank-wrapper'>
          <i className='icon-star'></i>
          {carOwnerData.avgRank}<span> ({userFeedbacks.length} отзыва)</span>
        </div>
        <div className='car-info__feedbacks'>
          {userFeedbacks.map(item => {
            return (
              <Feedback feedback={item} key={item.date} />
            )
          })}
        </div>
      </div>}
      <div className='car-info__footer'>
        <Link to={`/cars/rent/${carId}`}>
          Арендовать
        </Link>
      </div>
    </div >
  )
}