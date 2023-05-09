import { put } from "redux-saga/effects";
import { setUser } from "../reducers/userSlice";

function* acceptRequest(action) {
    console.log("from accept request saga")
    console.log(action.payload)
    yield put(setUser(action.payload));
};

export default acceptRequest;