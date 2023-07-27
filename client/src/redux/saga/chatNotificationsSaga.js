import { put } from "redux-saga/effects";
import { setNotification } from "../reducers/chatSlice";

function* chatNotification(action) {
    yield put( setNotification(action.payload));
};

export default chatNotification;