import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import loadingReducer from "./loadingReducer.js";

export default combineReducers({
    authFunc: authReducer,
    loadingFunc: loadingReducer
})