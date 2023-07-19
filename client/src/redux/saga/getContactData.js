import { put, call } from "redux-saga/effects";
import { gql } from "@apollo/client";
import { setData } from "../reducers/contactSlice";
import client from "../../apolloClient";

function* getContactData(action){
    const options = {
        query: gql `
            query ContactData($contactDataInput: ContactDataInput) {
                contactData(contactDataInput: $contactDataInput) {
                    image
                }
            }
        `,
        variables: {
          contactDataInput: action.payload.contactDataInput,
        },
    }
    try {
        const contactData = yield call(client.query, options)
        yield put(setData(contactData.data.contactData));
    }
    catch (error) {
        console.log(error)
    }
}

export default getContactData