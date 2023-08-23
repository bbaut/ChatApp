import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import { auth, fetching } from "../reducers/authSlice";
import client from "../../apolloClient";

function* login(action) {
  const options = {
    mutation: gql`
        mutation Mutation($loginInput: LoginInput) {
            loginUser(loginInput: $loginInput) {
                username,
                email,
                token
        }
    }
    `,
    variables: {
        loginInput: action.payload,
    },
  };
  try {
    const data = yield call(client.mutate, options);
    yield put(auth(data.data.loginUser));
    localStorage.setItem('token', data.data.loginUser.token);
    localStorage.setItem('email', data.data.loginUser.email);
  } catch (err) {
    yield console.log({ error: "errorSendMessage", severity: "warning" });
  }
}

export default login;