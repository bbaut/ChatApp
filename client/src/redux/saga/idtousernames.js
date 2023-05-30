import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../apolloClient";
import { addUsernameRequests } from "../reducers/userSlice";


function* queryUsernames(action) {
  const options = {
    query: gql`
        query IdToUsrnm($idInput: IdInput) {
            idToUsrnm(idInput: $idInput) {
                usernames
            }
        }
    `,
    variables: {
        idInput: {
            ids: action.payload
        }
    },
    fetchPolicy: "no-cache",
  };

  try {
    const res = yield call(client.query, options);
    const usernamesArray = res.data.idToUsrnm.usernames;
    yield put(addUsernameRequests(usernamesArray));
  } catch (err) {
        console.log({ error: "errorQueryMessages", severity: "warning" })
  }
}

export default queryUsernames;