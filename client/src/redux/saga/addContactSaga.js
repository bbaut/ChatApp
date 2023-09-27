import { call, put } from "redux-saga/effects";
import { gql } from "@apollo/client";
import client from "../../apolloClient";
import { setError } from "../reducers/userSlice";

function* addFriend(action) {
    const options = {
      mutation: gql`
        mutation AddContact($addInput: [AddInput]) {
          addContact(addInput: $addInput) {
            username
            email
          }
        }
      `,
      variables: {
        addInput: action.payload.add
      },
      fetchPolicy: "no-cache",
    };
    try {
      const data = yield call(client.mutate, options);
    } catch (error) {
      yield put(setError(error.message));
    }
  }
  
  export default addFriend;