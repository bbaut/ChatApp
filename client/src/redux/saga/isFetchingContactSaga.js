import { put } from "redux-saga/effects";
import { isFetching } from "../reducers/contactSlice";

function* isFetchingC() {
    yield put(isFetching())
};

export default isFetchingC;