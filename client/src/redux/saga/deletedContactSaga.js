import { put } from "redux-saga/effects";
import { deleteContact } from "../reducers/userSlice";
import {currentChat} from "../reducers/chatSlice";

function* deletedContact(action) {
    yield put( deleteContact (action.payload));
    yield put( currentChat({chat: "undefined"}));
};

export default deletedContact;