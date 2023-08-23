import { put, call } from "redux-saga/effects";
import { gql } from "@apollo/client";
import client from "../../apolloClient"
import { setRegisterFetching, setError } from "../reducers/registerSlice";

function* register(action) {
  const options = {
    mutation: gql`
      mutation Mutation($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            username
        }
      }
    `,
    variables: {
      registerInput: action.payload.register,
    },
  };

  try {
    // yield put(setRegisterFetching(true));
    yield call(client.mutate, options);
    // yield put(setRegisterFetching(false));
  } catch (error) {
    yield put (setError(error.message))
    console.log(error)
  }
}

export default register;