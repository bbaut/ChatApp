import { put } from "redux-saga/effects";
import { logoutUser } from "../reducers/authSlice";

function* logout(action) {
    yield put(logoutUser(action.payload.data.profileUser));
};

export default logout;