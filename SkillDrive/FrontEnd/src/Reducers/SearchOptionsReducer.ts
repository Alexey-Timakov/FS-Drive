import { CarCategory, CarSearchOptions } from "../Interfaces/ICarSearchOptions";
import { CHANGE_SEARCH_OPTIONS, CHANGE_CAR_TYPE, CHANGE_TOWN_NAME } from "../Actions/searchOptionsAction";

const DEFAULT_STATE: CarSearchOptions = {
  town: "",
  townVariants: [],
  dates: "",
  carType: {
    categoryName: "Легковые",
  }
}

export const searchOptions = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CHANGE_CAR_TYPE:
      const categoryName = action.payload.categoryName;
      return {
        ...state,
        carType: {
          categoryName
        }
      };

    case CHANGE_TOWN_NAME:
      const townName = action.payload.townName;
      return {
        ...state,
        town: townName
      };

    default: return state;
  }
};