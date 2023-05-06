import { put } from "redux-saga/effects";
import { addRequest } from "../reducers/userSlice";

function* addNewRequest(action) {
    console.log("from request saga")
    console.log(action.payload)
    yield put(addRequest(action.payload));
};

export default addNewRequest;