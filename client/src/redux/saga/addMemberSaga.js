import { call, put } from "redux-saga/effects";
import { gql } from "@apollo/client";
import client from "../../apolloClient";
import { setAddedMember } from "../reducers/chatSlice";
import { addGroup } from "../reducers/userSlice";


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
      console.log(res)
      // yield put(setAddedMember(action.payload.member.username));
      // yield put(addGroup(action.payload.member));
    } catch (error) {
      
    }
  }
  
  export default addMemberGroup;