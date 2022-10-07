// export const ADD_INITIAL_SEARCH_OPTIONS = "ADD_INITIAL_SEARCH_OPTIONS";
export const CHANGE_SEARCH_OPTIONS = "CHANGE_SEARCH_OPTIONS";
export const CHANGE_CAR_TYPE = " CHANGE_CAR_TYPE";
export const CHANGE_TOWN_NAME = " CHANGE_TOWN_NAME";


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