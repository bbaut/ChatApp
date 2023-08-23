import { put } from "redux-saga/effects";
import { auth } from "../reducers/authSlice";

function* setUserAuthenticate(action) {
    yield put(auth(action.payload.data.profileUser));
};

export default setUserAuthenticate;