import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import loadingReducer from "./loadingReducer.js";
import findContactReducer from "./findContactReducer.js";

export default combineReducers({
    authFunc: authReducer,
    loadingFunc: loadingReducer,
    findContactFunc: findContactReducer
})