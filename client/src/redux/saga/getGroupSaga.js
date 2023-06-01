import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../apolloClient";
import { currentRoom, isFetching } from "../reducers/chatSlice";

function* queryGroup(action) {
  const options = {
    query: gql`
        query GetGroup($getGroupInput: getGroupInput) {
            getGroup(getGroupInput: $getGroupInput) {
                _id
                groupName
                members
            }
        }
    `,
    variables: {
        getGroupInput: action.payload
    },
    fetchPolicy: "no-cache",
  };

  try {
    yield put(isFetching());
    console.log("hey")
    const res = yield call(client.query, options);
    console.log(res)
    const group = res.data.getGroup;
    yield put(currentRoom(group));
  } catch (err) {
    yield put(
        console.log({ error: "errorQueryMessages", severity: "warning" })
    );
  }
}

export default queryGroup;