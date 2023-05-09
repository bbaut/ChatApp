import { call, put } from "redux-saga/effects";
import { gql } from "@apollo/client";
import client from "../../apolloClient";
import { setUserFetching, acceptRequest } from "../reducers/userSlice";

function* acceptFriend(action) {
    const options = {
      mutation: gql`
        mutation Mutation($acceptContactInput: [AcceptContactInput]) {
            acceptContact(acceptContactInput: $acceptContactInput) {
                email
                contacts
                username
                requests {
                from
                to
                }
                _id
            }
        }
      `,
      variables: {
        acceptContactInput: action.payload
      },
      fetchPolicy: "no-cache",
    };
    try {
        // yield put(setUserFetching());
        yield call(client.mutate, options);
        // yield put(acceptRequest(friends.data.acceptContact))
    } catch (error) {
        yield console.log({ error: "add Friend Error", severity: "error" }
        );
    }
  }
  
  export default acceptFriend;