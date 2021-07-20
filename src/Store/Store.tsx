import { createStore } from "redux";
import { addUserInfoToStateReducer } from "../Reducers/addUserInfoToStateReducer.js"

export const store = createStore(addUserInfoToStateReducer);
