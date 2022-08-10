import React from 'react'
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NoScript from '../Common/NoScript';
import Slider from '../Slider/Slider';

import './MainPage.scss';
import { sliderElementsList } from '../Slider/slider_elements_list';

import mainPageHeaderImage from './images/undraw_city_driver.svg';
import mainPageCityDriver from './images/undraw_fast_car.svg';
import mainPageVehicleSale from './images/undraw_vehicle_sale.svg';
import mainPageOnlineTransactions from './images/undraw_online_transactions.svg';
import mainPageToyCar from './images/undraw_toy_car.svg';
import dashedLineHorizontal from './images/dashed_line_horizontal.svg';
import dashedLineHorizontalShort from './images/dashed_line_horizontal_short.svg';
import iconPrice from './images/icon_price.svg';
import iconUSD from './images/icon_usd.svg';
import iconPercent from './images/icon_percent.svg';
import iconIncome from './images/icon_income.svg';

import "./images/ivan.jpg";
import "./images/user.jpg";
import "./images/nick.jpg";
import "./images/phil.jpg";

function MainPage() {
  return (
    <>
      <Header />
      <NoScript />
      <section className="main__section main__section_header">
        <figure className="section__image section__image_header"><img src={mainPageHeaderImage} alt="Схематическое изображения водителя и автомобиля" /></figure>
        <div className="section__description section__description_header">
          <h1>Каршеринг в любой точке России</h1>
          <p>Будьте всегда за рулём во время путешествий и командировок.</p>
          <div className="button_link">
            <Link to="/Reg" aria-label="Перейти на страницу регистрации">Зарегистрироваться</Link>
          </div>
        </div>
      </section>

      <section className="main__section">
        <figure className="section__image">
          <img src={mainPageCityDriver} alt="Схематическое изображения водителя, сидящего на  автомобиле" />
        </figure>
        <div className="section__description">
          <h2>Аренда напрямую от владельцев</h2>
          <p>Вы получите автомобиль от его собственника, а мы проверим юридическую чистоту и техническую исправность.</p>
        </div>
      </section>

      <section className="main__section">
        <div className="section__description">
          <h2>Автомобили на любой вкус</h2>
          <p>Вы всегда можете подобрать автомобиль любого класса от бюджетных моделей до премиум-класса и спорткаров.</p>
        </div>
        <figure className="section__image">
          <img src={mainPageVehicleSale} alt="Схематическое изображения водителя, сидящего на  автомобиле" />
        </figure>
      </section>

      <section className="main__section">
        <figure className="section__image">
          <img src={mainPageOnlineTransactions} alt="Схематическое изображения водителя, сидящего на  автомобиле" />
        </figure>
        <div className="section__description">
          <h2>Гарантия честной аренды</h2>
          <p>Общение и оплата происходит через наш сервис, что предотвращает вас от обмана.</p>
        </div>
      </section>

      <section className="main__section main__section_steps main__section_background main__section_how-to">
        <h2>Как арендовать автомобиль</h2>
        <div className="section__steps">
          <div className="step">
            <div className="step__index">1</div>
            <div className="step__title"><p>Выберите автомобиль</p></div>
          </div>
          <div className="step step_dashes"><img src={dashedLineHorizontal} /></div>
          <div className="step">
            <div className="step__index">2</div>
            <div className="step__title"><p>Забронируйте дату и время</p></div>
          </div>
          <div className="step step_dashes"><img src={dashedLineHorizontal} /></div>
          <div className="step">
            <div className="step__index">3</div>
            <div className="step__title"><p>Получите автомобиль</p></div>
          </div>
        </div>
      </section>

      <section className="main__section main__section_steps main__section_rules">
        <h2 className='mb_20'>У вас есть автомобиль?</h2>
        <p className='mb_80'>Чтобы он не простаивал — сдавайте его в аренду и зарабатывайте.</p>
        <div className="section__steps">
          <div className="step">
            <div className="step__index"><img src={iconPrice} /></div>
            <div className="step__title"><p>Вы сами указываете цену</p></div>
          </div>
          <div className="step step_dashes step_short"><img src={dashedLineHorizontalShort} /></div>
          <div className="step">
            <div className="step__index"><img src={iconUSD} /></div>
            <div className="step__title"><p>Мы страхуем автомобили</p></div>
          </div>
          <div className="step step_dashes step_short"><img src={dashedLineHorizontalShort} /></div>
          <div className="step">
            <div className="step__index"><img src={iconPercent} /></div>
            <div className="step__title"><p>Наша комиссия всего 3%</p></div>
          </div>
          <div className="step step_dashes step_short"><img src={dashedLineHorizontalShort} /></div>
          <div className="step">
            <div className="step__index"><img src={iconIncome} /></div>
            <div className="step__title"><p>Выплаты каждую неделю</p></div>
          </div>
        </div>
      </section>

      <section className="main__section main__section_background main__section_feedbacks">
        <div className="section__description section__description_wide" style={{ paddingRight: "0" }}>
          <h2>Отзывы клиентов</h2>
          <Slider sliderElements={sliderElementsList} />
        </div>
      </section>

      <section className="main__section main__section_column">
        <figure className="section__image">
          <img src={mainPageToyCar} alt="Схематическое изображения водителя, сидящего на  автомобиле" />
        </figure>
        <div className="section__description section__description_wide" style={{ paddingRight: "0" }}>
          <h2>Попробуйте аренду на себе</h2>
        </div>
        <div className="button_link">
          <Link to="/Reg" aria-label="Перейти на страницу регистрации">Зарегистрироваться</Link>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default MainPage