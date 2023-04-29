import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import SearchContact from '../components/SearchContact'
import Requests from '../components/Requests'
import { gql, useLazyQuery } from '@apollo/client'
import { useSelector } from 'react-redux'


const REQUESTS_CONTACT = gql `
    query RequestsContact($requestsInput: RequestsInput) {
        requestsContact(requestsInput: $requestsInput) {
            requests
        }
    }
`


const Contacts = () => {

  const user = useSelector((state) => state.authFunc.auth);

    let emailUser;

    if (user.hasOwnProperty('profileUser')){
        emailUser = user.profileUser.email
    }
    else {
        emailUser = user.loginUser.email
    }

  const[requestsContact, {loading,error,data}] = useLazyQuery(REQUESTS_CONTACT,{
    variables: {requestsInput: {
      emailUser
    }},
    onError(graphQLErrors){
        console.log(graphQLErrors.networkError.result.msg);
    },
    onCompleted(data) {
      console.log("holahola")
      console.log(data)
    },
})

  useEffect(() => {
    console.log("hey")
    requestsContact();
  },[])

  return (
    <Box
      bgcolor="white"
      flex={5}
      p={2}
    >
      <h1>Contacts</h1>
      <Box sx={{width:500}}>
        <SearchContact/>
        <Requests/>
      </Box>

    </Box>

  )
}

export default Contacts