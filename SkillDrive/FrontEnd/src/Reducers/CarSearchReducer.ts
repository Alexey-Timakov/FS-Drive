import { CarSearchResults, CarInfo, ICarOwnerData } from "../Interfaces/ICarSearchResults";
import { ADD_DEFAULT_CARS, ADD_FETCHED_CAR } from "../Actions/carSearchAction";
import { ADD_CAR_OWNER_DATA } from "../Actions/userAction";

const DEFAULT_STATE: CarSearchResults = {
  defaultResults: [],
  fetchedResults: [],
  fetchedCar: {} as CarInfo,
  carOwnerData: {} as ICarOwnerData,
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
      };

    case ADD_CAR_OWNER_DATA:
      const carOwnerData = action.payload.carOwner;
      return {
        ...state,
        carOwnerData
      };

    default: return state;
  }
};