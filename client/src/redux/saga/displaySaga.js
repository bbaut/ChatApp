import { put } from "redux-saga/effects";
import { setDisplay } from "../reducers/displaySlice";

function* setDisplayView(action) {
    yield put(setDisplay(action.payload));
};

export default setDisplayView;