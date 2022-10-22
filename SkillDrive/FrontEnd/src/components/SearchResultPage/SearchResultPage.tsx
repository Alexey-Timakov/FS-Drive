import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCars } from '../../Actions/carSearchAction';
import { ICarSearchBody } from '../../Interfaces/ICarSearchOptions';
import { IState } from '../../Interfaces/IState';
import SearchPanel from '../SearchPanel/SearchPanel';

import "./SearchResultPage.scss";
import SearchResultThumbnail from './SearchResultThumbnail';

export default function SearchResultPage() {
  const dispatch = useDispatch();
  const searchButton = useRef<HTMLButtonElement>(null);
  const town = useSelector((state: IState) => state.searchOptions.town);
  const dates = useSelector((state: IState) => state.searchOptions.dates);
  const carCategory = useSelector((state: IState) => state.searchOptions.categoryName);
  const fetchedCars = useSelector((state: IState) => state.cars.fetchedCars);

  const searchCars = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const searchBody: ICarSearchBody = {
      town,
      dates: [dates.dateStart, dates.dateEnd],
      categoryName: carCategory
    };

    dispatch(fetchCars(searchBody));
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='search-results__wrapper'>
      <div className='search-results__search-wrapper'>
        <SearchPanel />
        <button ref={searchButton} className='search-btn' onClick={(e) => searchCars(e)}>Найти</button>
      </div>

      <div className='search-results__buttons'>
        <button disabled>Любая цена</button>
        <button disabled>Любые КПП</button>
        <button disabled>Любой привод</button>
        <button disabled>Любые двигатели</button>
      </div>

      {fetchedCars.length !== 0 &&
        <div className='search-results__results'>
          {fetchedCars.map(item => {
            return (
              <Link to={`/cars/${item.carId}`} key={item.carId}>
                <SearchResultThumbnail
                  searchResultItem={item}
                />
              </Link>
            )
          })}
        </div>
      }
    </div>
  )
}
