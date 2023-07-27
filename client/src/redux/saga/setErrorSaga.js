import { put } from "redux-saga/effects";
import { setError } from "../reducers/userSlice";

function* setErrorFunction() {
      yield put(setError(null));
  }
  
  export default setErrorFunction;