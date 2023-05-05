import {takeLatest, takeEvery, all} from "redux-saga/effects";
import { GET_USER } from "../constants";
import { handlerGetUser } from "./requests/request";
import register from "./registerSaga";
import addFriend from "./addContactSaga";
import addNewRequest from "./addRequestSaga";

export function* watchGetUser(){
    yield takeLatest(GET_USER, handlerGetUser)
}

export function* watchRegister(){
    yield takeLatest("register", register);
}

export function* watchAddContact(){
    yield takeLatest("addFriend", addFriend)
}

export function* watchAddNewRequest(){
    yield takeEvery("addNewRequest", addNewRequest)
}

export default function* rootSaga() {
    yield all([
        watchGetUser(),
        watchRegister(),
        watchAddContact(),
        watchAddNewRequest(),
    ]);
}