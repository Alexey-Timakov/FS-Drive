import { ADD_USER_INFO } from "../Actions/addUserInfoToStateAction";
import { ADD_INITIAL_DATA } from "../Actions/addInitialLoadingData";
import { UserState } from "../interfaces/UserState";
const DEFAULT_STATE = {} as UserState;

export const addUserInfoToStateReducer = (state: UserState = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_USER_INFO:
    case ADD_INITIAL_DATA:
      const key = action.payload.InputName;
      const value = action.payload.InputValue;
      return {
        ...state,
        user: {
          ...state.user,
          [key]: value
        }
      };

    default: return state;
  }
};