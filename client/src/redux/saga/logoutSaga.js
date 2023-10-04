import { put } from "redux-saga/effects";
import { cleanAuthState } from "../reducers/authSlice";
import { cleanUserState } from "../reducers/userSlice";
import { cleanChatState } from "../reducers/chatSlice";
import { cleanContactState } from "../reducers/contactSlice";
import { cleanDisplayState } from "../reducers/displaySlice";
import { cleanFindState } from "../reducers/findContactSlice";
import { cleanRegisterState } from "../reducers/registerSlice";

function* logout(action) {
    yield put(cleanAuthState());
    yield put(cleanUserState());
    yield put(cleanChatState());
    yield put(cleanContactState());
    yield put(cleanDisplayState());
    yield put(cleanFindState());
    yield put(cleanRegisterState());
};

export default logout;