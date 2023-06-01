import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../apolloClient";
import { currentRoom, isFetching } from "../reducers/chatSlice";

function* queryRoom(action) {
  const options = {
    query: gql`
        query Query($getRoomInput: getRoomInput) {
            getRoom(getRoomInput: $getRoomInput) {
                _id
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
    const room = res.data.getRoom;
    yield put(currentRoom(room));
  } catch (err) {
    yield put(
        console.log({ error: "errorQueryMessages", severity: "warning" })
    );
  }
}

export default queryRoom;