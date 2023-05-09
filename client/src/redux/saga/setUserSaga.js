import { put, call } from "redux-saga/effects";
import { gql } from "@apollo/client";
import { setUser, setUserFetching } from "../reducers/userSlice";
import client from "../../apolloClient";

function* setUserAuthenticated(action) {
    const options = {
        query: gql`
            query Query($userDataInput: UserDataInput) {
                profileUserData(userDataInput: $userDataInput) {
                    contacts
                    email
                    requests {
                        from
                        to
                    }
                    username
                    _id
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
        console.log(userData)
        yield put(setUser(userData.data.profileUserData));
    }
    catch (error) {
        console.log(error)
    }
};

export default setUserAuthenticated;