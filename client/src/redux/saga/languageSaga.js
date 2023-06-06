import { put } from "redux-saga/effects";
import { setLanguage } from "../reducers/userSlice";

function* setLng(action) {
    yield put(setLanguage(action.payload.language));
};

export default setLng;