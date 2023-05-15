import { put } from "redux-saga/effects";
import { addMessage } from "../reducers/chatSlice";

function* addNewMessage(action) {
    yield put(addMessage(action.payload));
};

export default addNewMessage;