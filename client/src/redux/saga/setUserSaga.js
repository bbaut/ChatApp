import { put, call } from "redux-saga/effects";
import { gql } from "@apollo/client";
import { setUserFetching, setUserProfile } from "../reducers/userSlice";
import client from "../../apolloClient";

function* setUserAuthenticated(action) {
    const options = {
        query: gql`
            query Query($userDataInput: UserDataInput) {
                profileUserData(userDataInput: $userDataInput) {
                    contacts
                    email
                    chatContacts
                    groups{
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
          userDataInput: action.payload,
        },
    };
    try {
        yield put(setUserFetching());
        const userData = yield call(client.query, options)
        yield put(setUserProfile(userData.data.profileUserData));
    }
    catch (error) {
        console.log(error)
    }
};

export default setUserAuthenticated;