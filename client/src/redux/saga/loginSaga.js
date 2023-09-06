import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import { auth, fetching, loginError } from "../reducers/authSlice";
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
    localStorage.setItem('token', data.data.loginUser.token);
    document.cookie = `token = ${data.data.loginUser.token}`;
    localStorage.setItem('email', data.data.loginUser.email);
    yield put(auth(data.data.loginUser));
  } catch (error) {
    yield put(loginError(error.message));
  }
}

export default login;