import { createStore } from "redux";
import { addUserInfoToStateReducer } from "../Reducers/addUserInfoToStateReducer.js"

export const store = createStore(
    addUserInfoToStateReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
