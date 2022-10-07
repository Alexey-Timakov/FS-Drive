import { ADD_USER_INFO } from "../Actions/addUserInfoToStateAction";
import { ADD_INITIAL_DATA } from "../Actions/addInitialLoadingData";
import { IUserState } from "../Interfaces/IUserState";
const DEFAULT_STATE = {} as IUserState;

export const userInfo = (state: IUserState = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_USER_INFO:
    case ADD_INITIAL_DATA:
      const key = action.payload.InputName;
      const value = action.payload.InputValue;
      return {
        ...state,
        [key]: value
      };

    default: return state;
  }
};