import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../apolloClient";

function* newMessage(action) {
  const options = {
    mutation: gql`
      mutation CreateMessage($createMessageInput: MessageInput) {
        createMessage(createMessageInput: $createMessageInput) {
          chatId
          message {
            text
            isScribble
          }
          sender
        }
      }
    `,
    variables: {
      createMessageInput: action.payload.newMessage,
    },
    fetchPolicy: "no-cache",
  };
  try {
    yield call(client.mutate, options);
  } catch (err) {
    yield put(
      console.log({ error: "errorSendMessage", severity: "warning" })
    );
  }
}

export default newMessage;