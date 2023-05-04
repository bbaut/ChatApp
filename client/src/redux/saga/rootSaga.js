import {takeLatest, all} from "redux-saga/effects";
import { GET_USER } from "../constants";
import { handlerGetUser } from "./requests/request";
import register from "./registerSaga";

export function* watchGetUser(){
    yield takeLatest(GET_USER, handlerGetUser)
}

export function* watchRegister(){
    yield takeLatest("register", register);
}

export default function* rootSaga() {
    yield all([
        watchGetUser(),
        watchRegister(),
    ]);
}