import { $api, API_URL } from "../http";
import { DateStartDateEnd, Town } from "../Interfaces/ICarSearchOptions";

// export const ADD_INITIAL_SEARCH_OPTIONS = "ADD_INITIAL_SEARCH_OPTIONS";
export const CHANGE_SEARCH_OPTIONS = "CHANGE_SEARCH_OPTIONS";
export const CHANGE_CAR_TYPE = " CHANGE_CAR_TYPE";
export const CHANGE_TOWN_NAME = " CHANGE_TOWN_NAME";
export const ADD_TOWN_VARIANTS = " ADD_TOWN_VARIANTS";
export const CHANGE_START_DATE = "CHANGE_START_DATE";
export const CHANGE_END_DATE = "CHANGE_END_DATE";

export const changeCarType = (categoryName: string) => ({
  type: CHANGE_CAR_TYPE,
  payload: {
    categoryName
  }
});

export const changeTownName = (townName: string) => ({
  type: CHANGE_TOWN_NAME,
  payload: {
    townName
  }
});

export const addTownVariants = (townVariants: Town[]) => ({
  type: ADD_TOWN_VARIANTS,
  payload: {
    townVariants
  }
});

export const searchTowns = (townName: string) => dispatch => {
  $api.get<Town[]>(`${API_URL}/towns/get-towns/${townName}`)
    .then(data => {
      dispatch(addTownVariants(data.data));
    })
    .catch(error => {
      console.log(error);
    })
}

export const changeStartDate = (date: string) => ({
  type: CHANGE_START_DATE,
  payload: date
})

export const changeEndDate = (date: string) => ({
  type: CHANGE_END_DATE,
  payload: date
})