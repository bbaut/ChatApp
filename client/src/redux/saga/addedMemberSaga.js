import { put } from "redux-saga/effects";
import { setAddedMember } from "../reducers/chatSlice";
import { addGroup } from "../reducers/userSlice";

function* addedMember(action) {
    console.log(action.payload)
    yield put(setAddedMember(action.payload.member.username));
    yield put(addGroup(action.payload.member));
};

export default addedMember;