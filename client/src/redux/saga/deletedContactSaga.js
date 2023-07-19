import { put } from "redux-saga/effects";
import { deleteContact } from "../reducers/userSlice";

function* deletedContact(action) {
    yield put( deleteContact (action.payload));
};

export default deletedContact;