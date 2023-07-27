import { put } from "redux-saga/effects";
import { acceptNewRequest } from "../reducers/userSlice";

function* acceptRequest(action) {
    yield put(acceptNewRequest(action.payload))
};

export default acceptRequest;