import React from 'react'
import { Link } from 'react-router-dom';
import { API_URL } from '../../http';
import { ICarSearchResult } from '../../Interfaces/ICarSearchResults';
import "./SearchResultThumbnail.scss";

export type ISearchResultThumbnail = {
  searchResultItem: ICarSearchResult
}

export default function SearchResultThumbnail({ searchResultItem }: ISearchResultThumbnail) {
  const priceFirstDigit: string = Math.floor(searchResultItem.price / 1000).toString();
  const priceLastDigits: string = (searchResultItem.price % 1000).toString();
  let engineSize: string = "";
  if (searchResultItem.engine) {
    engineSize = (searchResultItem.engine.size % 1 === 0)
      ? searchResultItem.engine.size.toString().concat(".0")
      : searchResultItem.engine.size.toString();
  }

  return (
    <div className='search-result-thumbnail__wrapper'>
      <div className='search-result-thumbnail__image'>
        <img src={`${API_URL}/${searchResultItem.primaryImageLink}`} />
      </div>
      <div className='search-result-thumbnail__info'>
        {searchResultItem.avgRank !== 0 &&
          <div className='rank'>
            <i className='icon-star'></i>
            {searchResultItem.avgRank}<span> ({searchResultItem.totalRanks})</span>
          </div>
        }
        <div className='title'>{searchResultItem.brand} {searchResultItem.model}, {searchResultItem.year}</div>
        <div className='engine-and-transmission'>
          <div className='engine'>
            <i className='icon-engine'></i>
            <span>
              {engineSize} / {searchResultItem.engine.brakePower} л.с. / {searchResultItem.engine.fuelType}
            </span>
          </div>
          <div className='transmission'>
            <i className='icon-gear-shift'></i>
            <span>
              {searchResultItem.transmission} / {searchResultItem.drivingWheelType} привод
            </span>
          </div>
        </div>
        <div className='price'>
          {priceFirstDigit} {priceLastDigits} &#8381; в сутки
        </div>
      </div>
      <div className='search-result-thumbnail__button'>
        <Link to={`/cars/rent/${searchResultItem.carId}`}>
          Арендовать
        </Link>
      </div>
    </div>
  )
}
