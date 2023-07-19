import { put } from "redux-saga/effects";
import { createGroup } from "../reducers/userSlice";

function* setNewGroup(action) {
    yield put(createGroup(action.payload));
};

export default setNewGroup;