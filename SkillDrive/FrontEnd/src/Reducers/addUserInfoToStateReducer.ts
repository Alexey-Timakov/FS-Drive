import { ADD_USER_INFO } from "../Actions/addUserInfoToStateAction";
import {UserState} from "../interfaces/UserState";
const DEFAULT_STATE = {} as UserState;

export const addUserInfoToStateReducer = (state: UserState = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ADD_USER_INFO:
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