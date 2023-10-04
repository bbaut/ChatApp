import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../apolloClient";
import { auth, loading } from "../reducers/authSlice";

function* getUser(action) {
  const options = {
    query: gql`
         query Query ($profileInput: ProfileInput){
            profileUser (profileInput: $profileInput){
                email
                username
            }
         }
    `,
    variables: {
      profileInput: action.payload
    },
    fetchPolicy: "no-cache",
  };

  try {
    // yield put(loading(true));
    const data = yield call(client.query, options);
    yield put(auth(data.data.profileUser));
    // console.log(action.payload.loading)
    yield put(loading(false));
  } catch (err) {
    yield put(
        console.log({ error: "errorQueryMessages", severity: "warning" })
    );
  }
}

export default getUser;