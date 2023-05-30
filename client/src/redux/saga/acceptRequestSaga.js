import { put } from "redux-saga/effects";
import { acceptNewRequest } from "../reducers/userSlice";

function* acceptRequest(action) {
    yield put(acceptNewRequest(action.payload))
    // yield put(setUser(action.payload));
};

export default acceptRequest;