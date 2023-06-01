import { put } from "redux-saga/effects";
import { addGroup } from "../reducers/userSlice";

function* setNewGroup(action) {
    yield put(addGroup(action.payload.groups));
};

export default setNewGroup;