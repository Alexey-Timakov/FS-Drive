import { $api, API_URL } from "../http";
import { CarInfo, ICarSearchResult } from "../Interfaces/ICarSearchResults";
import { ICarSearchBody } from "../Interfaces/ICarSearchOptions";

export const FETCH_DEFAULT_CARS = "FETCH_DEFAULT_CARS";
export const ADD_FETCHED_CARS = "ADD_FETCHED_CARS";
export const ADD_DEFAULT_CARS = "ADD_DEFAULT_CARS";
export const ADD_FETCHED_CAR = "ADD_FETCHED_CAR";

export const addDefaultCars = (cars: ICarSearchResult[]) => ({
  type: ADD_DEFAULT_CARS,
  payload: {
    cars
  }
})

export const addFetchedCars = (cars: ICarSearchResult[]) => ({
  type: ADD_FETCHED_CARS,
  payload: {
    cars
  }
})

export const addFetchedCar = (car: CarInfo) => ({
  type: ADD_FETCHED_CAR,
  payload: {
    car
  }
})

export const fetchDefaultCars = () => dispatch => {
  $api.get<ICarSearchResult[]>(`${API_URL}/cars/get-all-cars`)
    .then(data => {
      dispatch(addDefaultCars(data.data));
    })
    .catch(error => {
      console.log(error);
    })
}

export const fetchCars = (searchOptions: ICarSearchBody) => dispatch => {
  $api.post<ICarSearchResult[]>(`${API_URL}/cars/search-cars`, searchOptions)
    .then(data => {
      dispatch(addFetchedCars(data.data));
    })
    .catch(error => {
      console.log(error);
    })
}

export const fetchCar = (carId: string) => dispatch => {
  $api.get<CarInfo>(`${API_URL}/cars/get-car/${carId}`)
    .then(data => {
      dispatch(addFetchedCar(data.data));
    })
    .catch(error => {
      console.log(error);
    })
}