import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../apolloClient";
import { currentGroup, isFetching } from "../reducers/chatSlice";

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
    const res = yield call(client.query, options);
    const group = res.data.getGroup;
    yield put(currentGroup(group));
  } catch (err) {
    yield put(
        console.log({ error: "errorQueryMessages", severity: "warning" })
    );
  }
}

export default queryGroup;