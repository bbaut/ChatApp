import { call } from "redux-saga/effects";
import { gql } from "@apollo/client";
import client from "../../apolloClient";

function* addMemberGroup(action) {
    const options = {
      mutation: gql`
        mutation Mutation($addMemberInput: AddMemberInput) {
            addMemberGroup(addMemberInput: $addMemberInput) {
                _id
                contacts
                chatContacts
                email
                groups {
                chatId
                chatName
                }
                requests {
                from
                to
                }
                username
            }
        }
      `,
      variables: {
        addMemberInput: action.payload
      },
      fetchPolicy: "no-cache",
    };
    try {
      const res = yield call(client.mutate, options);
    } catch (error) {
      
    }
  }
  
  export default addMemberGroup;