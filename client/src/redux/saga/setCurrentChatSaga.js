import { put } from "redux-saga/effects";
import { setChat } from "../reducers/chatSlice";

function* setCurrentChatFunction() {
      yield put(setChat());
  }
  
  export default setCurrentChatFunction;