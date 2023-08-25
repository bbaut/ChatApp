import { put } from "redux-saga/effects";
import { currentGroupChat } from "../reducers/chatSlice";

function* currentGroupClick(action) {
    yield put(currentGroupChat(action.payload));
};

export default currentGroupClick;