import { CarSearchResults, CarInfo, ICarOwnerData } from "../Interfaces/ICarSearchResults";
import { ADD_FETCHED_CARS, ADD_FETCHED_CAR, ADD_DEFAULT_CARS } from "../Actions/carSearchAction";
import { ADD_CAR_OWNER_DATA } from "../Actions/carOwnerAction";
import { ADD_USER_FEEDBACKS } from "../Actions/feedbackAction";

const DEFAULT_STATE: CarSearchResults = {
  fetchedResults: [],
  fetchedCar: {} as CarInfo,
  carOwnerData: {} as ICarOwnerData,
  isSearchExecuted: false
}

export const carSearch = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_DEFAULT_CARS:
      const defaultResults = action.payload.cars;
      return {
        ...state,
        fetchedResults: defaultResults
      };

    case ADD_FETCHED_CARS:
      const fetchedResults = action.payload.cars;
      return {
        ...state,
        isSearchExecuted: true,
        fetchedResults
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

    case ADD_USER_FEEDBACKS:
      const feedbacks = action.payload.feedbacks;
      return {
        ...state, carOwnerData: {
          ...state.carOwnerData, feedbacks
        }
      }
    default: return state;
  }
};