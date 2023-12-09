import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../apolloClient";
import { contactFound } from "../reducers/findContactSlice";

function* existanceContact(action) {
  const options = {
    query: gql `
        query ExistanceContact($existanceInput: ExistanceInput) {
            existanceContact(existanceInput: $existanceInput) {
                username,
                email
            }
        }
    `,
    variables: {
        existanceInput: action.payload,
    },
    fetchPolicy: "no-cache",
  };
  try {
    const data = yield call(client.query, options);
    yield put(contactFound(data.data));
  } catch (err) {
      console.log({ error: err, severity: "warning" })
  }
}

export default existanceContact;