import {takeLatest, takeEvery, all} from "redux-saga/effects";
import register from "./registerSaga";
import addFriend from "./addContactSaga";
import addNewRequest from "./addRequestSaga";
import setUser from "./setUserSaga";
import setUserAuthenticate from "./setAuthUserSaga";
import removeRequest from "./deleteRequestSaga";
import acceptFriend from "./acceptContactSaga";
import acceptRequest from "./acceptRequestSaga";
import newRoom from "./newRoomSaga";
import newMessage from "./newMessageSaga";
import queryMessages from "./getMessagesSaga";
import addNewMessage from "./MessageSaga";
import queryRoom from "./getRoomSaga";
import newGroup from "./newGroupSaga";
import queryGroup from "./getGroupSaga";
import addMemberGroup from "./addMemberSaga";
import addNewMessageParticipants from "./addNewMessageParticipants";
import setLoading from "./loadingSaga";
import setNewGroup from "./groupCreatedSaga";
import setLng from "./languageSaga";

export function* watchRegister(){
    yield takeLatest("register", register);
}

export function* watchSetUser(){
    yield takeLatest("setUser", setUser)
}

export function* watchSetAuthUser(){
    yield takeLatest("setUserAuth", setUserAuthenticate)
}

export function* watchSetLoading(){
    yield takeLatest("setLoading", setLoading)
}

export function* watchAddContact(){
    yield takeLatest("addFriend", addFriend)
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

export function* watchSetNewGroup(){
    yield takeEvery("setNewGroup", setNewGroup)
}

export function* watchSetLanguage(){
    yield takeEvery("setLanguage", setLng)
}

export default function* rootSaga() {
    yield all([
        watchRegister(),
        watchSetUser(),
        watchSetAuthUser(),
        watchSetLoading(),
        watchAddContact(),
        watchAddNewRequest(),
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
        watchSetNewGroup(),
        watchSetLanguage(),
    ]);
}