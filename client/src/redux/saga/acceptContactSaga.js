import { call, put } from "redux-saga/effects";
import { gql } from "@apollo/client";
import client from "../../apolloClient";
import { acceptNewRequest } from "../reducers/userSlice";

function* acceptFriend(action) {
    const options = {
      mutation: gql`
        mutation Mutation($acceptContactInput: AcceptContactInput) {
            acceptContact(acceptContactInput: $acceptContactInput) {
                email
                contacts
                username
                chatContacts
                groups{
                        chatId
                        chatName
                    }
                requests {
                from
                to
                }
                _id
                image
            }
        }
      `,
      variables: {
        acceptContactInput: action.payload
      },
      fetchPolicy: "no-cache",
    };
    try {
        const userData = yield call(client.mutate, options);
        yield put( acceptNewRequest (userData.data.acceptContact));
    } catch (error) {
        yield console.log({ error: "add Friend Error", severity: "error" }
        );
    }
  }
  
  export default acceptFriend;