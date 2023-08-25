import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import client from "../../apolloClient";

function* deleteContact(action) {
    const options = {
        mutation : gql`
            mutation Mutation($deleteContactInput: [DeleteContactInput]) {
                deleteContact(deleteContactInput: $deleteContactInput) {
                    contacts
                    _id
                    email
                    username
                    image
                    requests {
                        from
                        to
                    }
                    groups{
                        chatId
                        chatName
                    }
                }
            }
        `,
        variables: {
            deleteContactInput: action.payload
        },
        fetchPolicy: "no-cache",
    };
    try {
        const userData = yield call(client.mutate, options);
    }
    catch (error) {
        yield console.log({ error: error.message, severity: "error" });
    }
}

export default deleteContact;