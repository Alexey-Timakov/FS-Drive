import { CarSearchResults, CarInfo } from "../Interfaces/ICarSearchResults";
import { ADD_DEFAULT_CARS, ADD_FETCHED_CAR } from "../Actions/carSearchAction";

const DEFAULT_STATE: CarSearchResults = {
  defaultResults: [],
  fetchedResults: [],
  fetchedCar: {} as CarInfo
}

export const carSearch = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_DEFAULT_CARS:
      const defaultResults = action.payload.cars;
      return {
        ...state,
        defaultResults
      };

    case ADD_FETCHED_CAR:
      const fetchedCar = action.payload.car;
      return {
        ...state,
        fetchedCar
      }
    default: return state;
  }
};