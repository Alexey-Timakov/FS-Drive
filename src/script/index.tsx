import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import App from "../components/app";
import {addUserInfoToStateReducer} from "../Reducers/addUserInfoToStateReducer.js"

const store = createStore(addUserInfoToStateReducer);

render(<Provider store={store}><App/></Provider>, document.getElementById("root"), );