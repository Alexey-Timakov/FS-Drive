import { $api, API_URL } from "../http";
import { Car } from "../Interfaces/ICarSearchResults";

export const FETCH_DEFAULT_CARS = "FETCH_DEFAULT_CARS";
export const ADD_DEFAULT_CARS = "ADD_DEFAULT_CARS";

export const addDefaultCars = (cars: Car[]) => ({
  type: ADD_DEFAULT_CARS,
  payload: {
    cars
  }
})

export const fetchDefaultCars = () => dispatch => {
  $api.get<Car[]>(`${API_URL}/cars/get-all-cars`)
    .then(data => {
      dispatch(addDefaultCars(data.data));
    })
    .catch(error => {
      console.log(error);
    })
}