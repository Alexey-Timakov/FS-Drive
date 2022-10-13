import { $api, API_URL } from "../http";
import { CarForMainPage, CarInfo } from "../Interfaces/ICarSearchResults";

export const FETCH_DEFAULT_CARS = "FETCH_DEFAULT_CARS";
export const ADD_DEFAULT_CARS = "ADD_DEFAULT_CARS";
export const ADD_FETCHED_CAR = "ADD_FETCHED_CAR";

export const addDefaultCars = (cars: CarForMainPage[]) => ({
  type: ADD_DEFAULT_CARS,
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
  $api.get<CarForMainPage[]>(`${API_URL}/cars/get-all-cars`)
    .then(data => {
      dispatch(addDefaultCars(data.data));
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