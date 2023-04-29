// import { gql } from '@apollo/client';
// import client from '../../../apolloClient';
// import {put, call} from "redux-saga/effects";
// import { setUser } from '../../reducers/usersReducer';
// import { useLazyQuery } from '@apollo/client';

// export function* handlerGetUser(action) {
//     const REQUESTS_CONTACT = gql `
//         query RequestsContact($requestsInput: RequestsInput) {
//             requestsContact(requestsInput: $requestsInput) {
//                 requests
//             }
//         }
//     `

//     const[requestsContact, {loading,error,data}] = useLazyQuery(REQUESTS_CONTACT,{
//         variables: {requestsInput: {
//         emailUser
//         }},
//         onError(graphQLErrors){
//             console.log(graphQLErrors.networkError.result.msg);
//         },
//         onCompleted(data) {
//         console.log("holahola")
//         console.log(data)
//         },
//     })

//     try {
//         const response = yield call (requestsContact, options)
//         const {data} = response;
//         yield put(setUser(data));
//     }
//     catch (error) {
//         console.log(error)  
//     }
// } 