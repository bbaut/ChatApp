import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import loadingReducer from "./loadingReducer.js";
import findContactReducer from "./findContactReducer.js";
import requestsContactReducer from "./requestsContactReducer.js";
import registerReducer from "./registerSlice.js";
import userReducer from "./userSlice.js"
import chatReducer from "./chatSlice.js";

export default combineReducers({
    register: registerReducer,
    authFunc: authReducer,
    loadingFunc: loadingReducer,
    findContactFunc: findContactReducer,
    requestContactFunc: requestsContactReducer,
    user: userReducer,
    chat: chatReducer,
})