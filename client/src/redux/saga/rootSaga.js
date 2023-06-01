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
import queryRoom from "./getRoomSaga";
import newGroup from "./newGroupSaga";
import queryGroup from "./getGroupSaga";
import addMemberGroup from "./addMemberSaga";
import addNewMessageParticipants from "./addNewMessageParticipants";

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
export function* watchCreateNewGroup(){
    yield takeLatest("createNewGroup", newGroup)
}

export function* watchCreateNewMessage(){
    yield takeLatest("createNewMessage", newMessage)
}

export function* watchAddNewMessage(){
    yield takeEvery("addNewMessage", addNewMessage)
}
export function* watchAddNewMessageParticipants(){
    yield takeEvery("addNewMessageParticipants", addNewMessageParticipants)
}

export function* watchGetMessages(){
    yield takeEvery("queryMessages", queryMessages)
}
export function* watchGetRoom(){
    yield takeEvery("queryRoom", queryRoom)
}
export function* watchGetGroup(){
    yield takeEvery("queryGroup", queryGroup)
}

export function* watchAddMemberGroup(){
    yield takeEvery("addMember", addMemberGroup)
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
        watchCreateNewGroup(),
        watchCreateNewMessage(),
        watchAddNewMessage(),
        watchAddNewMessageParticipants(),
        watchGetMessages(),
        watchGetRoom(),
        watchGetGroup(),
        watchAddMemberGroup(),
    ]);
}