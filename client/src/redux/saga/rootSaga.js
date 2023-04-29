import {takeLatest} from "redux-saga/effects";
import { GET_USER } from "../constants";
import { handlerGetUser } from "./requests/request";

export function* watchSaga(){
    yield takeLatest(GET_USER, handlerGetUser)
}