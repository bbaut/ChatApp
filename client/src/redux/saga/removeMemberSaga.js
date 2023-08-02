import { call } from "redux-saga/effects";
import { gql } from "@apollo/client";
import client from "../../apolloClient";

function* removeMemberGroup(action) {
    const options = {
      mutation: gql`
        mutation Mutation($removeMemberInput: removeMemberInput) {
            removeMemberGroup(removeMemberInput: $removeMemberInput) {
                _id
                contacts
                chatContacts
                email
                groups {
                chatId
                chatName
                }
                requests {
                to
                from
                }
                username
        }
}
      `,
      variables: {
        removeMemberInput: action.payload
      },
      fetchPolicy: "no-cache",
    };
    try {
      const res = yield call(client.mutate, options);
    } catch (error) {
      
    }
  }
  
  export default removeMemberGroup;