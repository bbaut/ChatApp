import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import loadingReducer from "./loadingReducer.js";
import findContactReducer from "./findContactReducer.js";
import requestsContactReducer from "./requestsContactReducer.js";
import registerReducer from "./registerSlice.js";

export default combineReducers({
    register: registerReducer,
    authFunc: authReducer,
    loadingFunc: loadingReducer,
    findContactFunc: findContactReducer,
    requestContactFunc: requestsContactReducer,
    
})