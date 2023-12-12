import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import { setUserFetching, deleteRequest } from "../reducers/userSlice";
import client from "../../apolloClient";

function* removeRequest(action) {
    const options = {
        mutation : gql`
            mutation Mutation($deleteReqInput: [DeleteReqInput]) {
                deleteRequest(deleteReqInput: $deleteReqInput) {
                    contacts
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
                    _id
                    image
                }
            }
        `,
        variables: {
            deleteReqInput: action.payload
        },
        fetchPolicy: "no-cache",
    };
    try {
        yield put(setUserFetching());
        const userData = yield call(client.mutate, options);
        yield put( deleteRequest (userData.data.deleteRequest));
    }
    catch (error) {
        yield console.log({ error: error.message, severity: "error" });
    }
}

export default removeRequest;