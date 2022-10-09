import { CarCategory, CarSearchOptions } from "../Interfaces/ICarSearchOptions";
import { CHANGE_SEARCH_OPTIONS, CHANGE_CAR_TYPE, CHANGE_TOWN_NAME, ADD_TOWN_VARIANTS } from "../Actions/searchOptionsAction";

const DEFAULT_STATE: CarSearchOptions = {
  town: "",
  townVariants: [],
  dates: "",
  carCategory: "Легковые",
}

export const searchOptions = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CHANGE_CAR_TYPE:
      const categoryName = action.payload.categoryName;
      return {
        ...state,
        carCategory: categoryName
      };
    case CHANGE_TOWN_NAME:
      const townName = action.payload.townName;
      return {
        ...state,
        town: townName
      };
    case ADD_TOWN_VARIANTS:
      const townVariants = action.payload.townVariants;
      return {
        ...state,
        townVariants
      }
    default: return state;
  }
};