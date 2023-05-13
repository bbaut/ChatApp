import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../apolloClient";
import { getRoomMessages } from "../reducers/conversationSlice";

function* queryMessages(action) {
  const options = {
    query: gql`
        query GetMessages($getMessageInput: UserDataInput) {
            getMessages(getMessageInput: $getMessageInput) {
                _id
                content
                chatId
            }
        }
    `,
    variables: action.payload,

    fetchPolicy: "no-cache",
  };

  try {
    const res = yield call(client.query, options);
    const { messages } = res.data;

    yield put(getRoomMessages(messages));
  } catch (err) {
    yield put(
        console.log({ error: "errorQueryMessages", severity: "warning" })
    );
  }
}

export default queryMessages;