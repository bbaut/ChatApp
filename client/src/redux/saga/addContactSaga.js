import { call } from "redux-saga/effects";
import { gql } from "@apollo/client";
import client from "../../apolloClient";

function* addFriend(action) {
    const options = {
      mutation: gql`
        mutation AddContact($addInput: [AddInput]) {
          addContact(addInput: $addInput) {
            username
            email
          }
        }
      `,
      variables: {
        addInput: action.payload.add
      },
      fetchPolicy: "no-cache",
    };
    try {
      const res = yield call(client.mutate, options);
      console.log("from add contact saga")
      console.log(res)
      yield console.log({ error: "request Sent", severity: "success" });
    } catch (error) {
      if (error.message === "Request already sent") {
        yield
          console.log({ error: "add Friend Error", severity: "error" }
        );
      } else if (error.message === "User not found") {
        yield
          console.log({ error: "user Not Found", severity: "error" }
        );
      } else {
        yield console.log({ error: error.message, severity: "error" });
      }
    }
  }
  
  export default addFriend;