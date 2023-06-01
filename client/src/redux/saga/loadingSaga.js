import { put } from "redux-saga/effects";
import { loading } from "../reducers/authSlice";

function* setLoading(action) {
    yield put(loading(action.payload.loading));
};

export default setLoading;