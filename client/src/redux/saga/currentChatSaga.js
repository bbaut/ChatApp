import { put } from "redux-saga/effects";
import { currentChat } from "../reducers/chatSlice";

function* currentChatClick(action) {
    yield put( currentChat(action.payload));
};

export default currentChatClick;