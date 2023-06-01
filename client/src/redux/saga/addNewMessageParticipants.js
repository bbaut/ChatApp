import { put } from "redux-saga/effects";
import { addMessageParticipants } from "../reducers/chatSlice";

function* addNewMessageParticipants(action) {
    yield put(addMessageParticipants(action.payload));
};

export default addNewMessageParticipants;