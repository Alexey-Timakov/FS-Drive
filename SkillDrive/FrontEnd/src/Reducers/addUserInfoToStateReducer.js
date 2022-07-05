import { ADD_USER_INFO } from "../Actions/addUserInfoToStateAction";

const DEFAULT_STATE = {};

export const addUserInfoToStateReducer = (state = DEFAULT_STATE, action) => {
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