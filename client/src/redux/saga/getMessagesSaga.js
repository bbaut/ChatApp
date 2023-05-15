import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../apolloClient";
import { getRoomMessages } from "../reducers/chatSlice";

function* queryMessages(action) {
  const options = {
    query: gql`
        query Query($getMessageInput: GetMessageInput) {
          getMessages(getMessageInput: $getMessageInput) {
            text
          }
        }
    `,
    variables: {
      getMessageInput: action.payload.queryInput
    },
    fetchPolicy: "no-cache",
  };

  try {
    const res = yield call(client.query, options);
    const messages = res;
    yield put(getRoomMessages(messages.data.getMessages));
  } catch (err) {
    yield put(
        console.log({ error: "errorQueryMessages", severity: "warning" })
    );
  }
}

export default queryMessages;