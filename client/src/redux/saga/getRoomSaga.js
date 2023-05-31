import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../apolloClient";
import { getRoomMessages, isFetching } from "../reducers/chatSlice";

function* queryRoom(action) {
  const options = {
    query: gql`
        query Query($getRoomInput: getRoomInput) {
            getRoom(getRoomInput: $getRoomInput) {
                _id
                groupName
                member
            }
        }
    `,
    variables: {
      getRoomInput: action.payload
    },
    fetchPolicy: "no-cache",
  };

  try {
    yield put(isFetching());
    const res = yield call(client.query, options);
    console.log(res)
    // const messages = res;
    // yield put(getRoomMessages(messages.data.getMessages));
  } catch (err) {
    yield put(
        console.log({ error: "errorQueryMessages", severity: "warning" })
    );
  }
}

export default queryRoom;