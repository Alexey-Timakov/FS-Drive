import { CarSearchOptions } from "../Interfaces/ICarSearchOptions";
import { CHANGE_CAR_TYPE, CHANGE_TOWN_NAME, ADD_TOWN_VARIANTS, CHANGE_START_DATE, CHANGE_END_DATE } from "../Actions/searchOptionsAction";

const DEFAULT_STATE: CarSearchOptions = {
  town: "",
  dates: {
    dateStart: "",
    dateEnd: ""
  },
  categoryName: "Легковые",
  townVariants: [],
}

export const searchOptions = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CHANGE_CAR_TYPE:
      const categoryName = action.payload.categoryName;
      return {
        ...state,
        categoryName: categoryName
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
    case CHANGE_START_DATE:
      const dateStart = action.payload;
      return {
        ...state,
        dates: { ...state.dates, dateStart }
      }
    case CHANGE_END_DATE:
      const dateEnd = action.payload;
      return {
        ...state,
        dates: { ...state.dates, dateEnd }
      }
    default: return state;
  }
};