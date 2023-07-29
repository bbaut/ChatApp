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
import removeMemberGroup from "./removeMemberSaga";
import addedMember from "./addedMemberSaga";
import removedMember from "./removedMemberSaga";
import getContactData from "./getContactData"
import deleteContact from "./deleteContact";
import deletedContact from "./deletedContactSaga";
import chatNotification from "./chatNotificationsSaga";
import isFetchingC from "./isFetchingContactSaga";
import setErrorFunction from "./setErrorSaga";
import setCurrentChatFunction from "./setCurrentChatSaga";

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
export function* watchRemoveMemberGroup(){
    yield takeEvery("removeMember", removeMemberGroup)
}

export function* watchSetNewGroup(){
    yield takeEvery("setNewGroup", setNewGroup)
}

export function* watchSetAddedMember(){
    yield takeEvery("setAddedMember", addedMember)
}
export function* watchSetRemovedMember(){
    yield takeEvery("setRemovedMember", removedMember)
}

export function* watchSetLanguage(){
    yield takeEvery("setLanguage", setLng)
}

export function* watchContactData(){
    yield takeEvery("getContactData", getContactData)
}
export function* watchDeleteContact(){
    yield takeEvery("deleteContact", deleteContact)
}
export function* watchDeletedContact(){
    yield takeEvery("deletedContact", deletedContact)
}

export function* watchChatNotification(){
    yield takeEvery("chatNotification", chatNotification)
}

export function* watchIsFetchingContact(){
    yield takeEvery("isFetchingContact", isFetchingC)
}

export function* watchSetError(){
    yield takeEvery("setError", setErrorFunction)
}

export function* watchSetCurrentChat(){
    yield takeEvery("setCurrentChat", setCurrentChatFunction)
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
        watchSetAddedMember(),
        watchSetRemovedMember(),
        watchRemoveMemberGroup(),
        watchSetNewGroup(),
        watchSetLanguage(),
        watchContactData(),
        watchDeleteContact(),
        watchDeletedContact(),
        watchChatNotification(),
        watchIsFetchingContact(),
        watchSetError(),
        watchSetCurrentChat()
    ]);
}