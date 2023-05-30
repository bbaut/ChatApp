import {takeLatest, takeEvery, all} from "redux-saga/effects";
import { GET_USER } from "../constants";
import { handlerGetUser } from "./requests/request";
import register from "./registerSaga";
import addFriend from "./addContactSaga";
import addNewRequest from "./addRequestSaga";
import setUser from "./setUserSaga";
import removeRequest from "./deleteRequestSaga";
import acceptFriend from "./acceptContactSaga";
import acceptRequest from "./acceptRequestSaga";
import newRoom from "./newRoomSaga";
import newMessage from "./newMessageSaga";
import queryMessages from "./getMessagesSaga";
import addNewMessage from "./MessageSaga";
import queryUsernames from "./idtousernames";

export function* watchGetUser(){
    yield takeLatest(GET_USER, handlerGetUser)
}

export function* watchRegister(){
    yield takeLatest("register", register);
}

export function* watchSetUser(){
    yield takeLatest("setUser", setUser)
}

export function* watchAddContact(){
    yield takeLatest("addFriend", addFriend)
}

export function* watchUsernameRequest(){
    yield takeLatest("usernameRequest", queryUsernames)
}

export function* watchAddNewRequest(){
    yield takeEvery("addNewRequest", addNewRequest)
}

export function* watchAcceptFriend(){
    yield takeEvery("acceptFriend", acceptFriend)
}
export function* watchAcceptRequest(){
    yield takeEvery("acceptRequest", acceptRequest)
}

export function* watchRemoveRequest(){
    yield takeEvery("removeRequest", removeRequest)
}

export function* watchCreateNewRoom(){
    yield takeLatest("createNewRoom", newRoom)
}

export function* watchCreateNewMessage(){
    yield takeLatest("createNewMessage", newMessage)
}

export function* watchAddNewMessage(){
    yield takeEvery("addNewMessage", addNewMessage)
}

export function* watchGetMessages(){
    yield takeEvery("queryMessages", queryMessages)
}

export default function* rootSaga() {
    yield all([
        watchGetUser(),
        watchRegister(),
        watchSetUser(),
        watchAddContact(),
        watchAddNewRequest(),
        watchUsernameRequest(),
        watchAcceptRequest(),
        watchAcceptFriend(),
        watchRemoveRequest(),
        watchCreateNewRoom(),
        watchCreateNewMessage(),
        watchAddNewMessage(),
        watchGetMessages(),
    ]);
}