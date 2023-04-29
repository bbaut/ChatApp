import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import loadingReducer from "./loadingReducer.js";
import findContactReducer from "./findContactReducer.js";
import requestsContactReducer from "./requestsContactReducer.js";

export default combineReducers({
    authFunc: authReducer,
    loadingFunc: loadingReducer,
    findContactFunc: findContactReducer,
    requestContactFunc: requestsContactReducer
})