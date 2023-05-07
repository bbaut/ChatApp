import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Search from "../components/SearchContact"

const Contacts = () => {
    // const Fetching = useSelector (
    //   (state) => state.user.isFetching
    // )

    // if(Fetching){
    //   return (
    //     <hi>Loading</hi>
    //   )
    // }

    const { username, contacts } = useSelector(
      (state) => state.user.value
    );
   
    return (
      <>
      <Box
        bgcolor="white"
        flex={5}
        p={2}
      >
        <h1>Contacts</h1>
        <Box sx={{width:500}}>
            <h2>You dont have contacts yet</h2>
            <h3>Start by adding a contact</h3>
            <Search/>
        </Box>
      </Box>
      </>
    )

}
    

export default Contacts

// import React, { useEffect } from 'react'
// import { Box } from '@mui/material'
// import SearchContact from '../components/SearchContact'
// import Requests from '../components/Requests'
// import { gql, useLazyQuery, useSubscription } from '@apollo/client'
// import { useSelector, useDispatch } from 'react-redux'
// import CONTACT_REQUEST from '../gql/contactRequest'


// const Contacts = () => {

//   const dispatch = useDispatch()
//   const user = useSelector((state) => state.authFunc.auth);

//     let emailUser;

//     if (user.hasOwnProperty('profileUser')){
//         emailUser = user.profileUser.email
//     }
//     else {
//         emailUser = user.loginUser.email
//     }

// useSubscription(CONTACT_REQUEST, {
//     onData: (data) => {
//       dispatch({
//         type: "addNewRequest",
//         payload: data.data.data.addContactRequest[1],
//       })
//     },
//     onError: (error) => {
//       console.log(error)
//     }
//   })

//   return (
//     <Box
//       bgcolor="white"
//       flex={5}
//       p={2}
//     >
//       <h1>Contacts</h1>
//       <Box sx={{width:500}}>
//         <SearchContact/>
//         <Requests/>
//       </Box>

//     </Box>

//   )
// }

// export default Contacts