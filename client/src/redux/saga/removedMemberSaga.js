import { put } from "redux-saga/effects";
import { setRemovedMember } from "../reducers/chatSlice";
import { addGroup } from "../reducers/userSlice";

function* removedMember(action) {
    yield put(setRemovedMember(action.payload.member.username));
    yield put(addGroup(action.payload.member));
};

export default removedMember;