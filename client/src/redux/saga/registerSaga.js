import { put, call } from "redux-saga/effects";
import { gql } from "@apollo/client";
import client from "../../apolloClient"
import { setRegisterFetching } from "../reducers/registerSlice";

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
    console.log("from try")
    yield put(setRegisterFetching());
    yield call(client.mutate, options);
  } catch (error) {
    console.log(error.message)
  }
}

export default register;