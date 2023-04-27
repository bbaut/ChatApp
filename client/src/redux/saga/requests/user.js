import { gql } from '@apollo/client';
import client from '../../../apolloClient';
import {put, call} from "redux-saga/effects";
import { setUser } from '../../reducers/usersReducer';

export function* handlerGetUser(action) {
    const options = {
        query: gql `
        query GetUser {
            users {
                name
                username
            }
        }
        `
    }

    try {
        const response = yield call (client.query, options)
        const {data} = response;
        yield put(setUser(data));
    }
    catch (error) {
        console.log(error)  
    }
} 