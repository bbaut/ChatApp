import List from '@mui/material/List';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Search from "../components/SearchContact"
import { useSubscription } from '@apollo/client';
import ACCEPT_CONTACT_REQUEST from "../gql/acceptContact"
import ContactLayer from '../components/ContactLayer';

const Contacts = () => {
    // const Fetching = useSelector (
    //   (state) => state.user.isFetching
    // )

    // if(Fetching){
    //   return (
    //     <hi>Loading</hi>
    //   )
    // }

    const dispatch = useDispatch();

    const { contacts } = useSelector(
      (state) => state.user.value
    );

    useSubscription(ACCEPT_CONTACT_REQUEST, {
      onData: (data) => {
        console.log(data.data.data)
        dispatch({
          type: "acceptRequest",
          payload: data.data.data,
      })
      },
      onError: (error) => {
          console.log(error)
      }
    })

    let contactsArray = [];

    console.log(contacts)

    if (contacts.length !== 0) {
        for (let i = 0; i<  contacts.length; i++){
            contactsArray.push(contacts[i])
        }

    return (
      <Box
      bgcolor="white"
      flex={5}
      p={2}
    >
          <h1>Contacts</h1>
          <Search/>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {contactsArray.map((contact) => (
                  <ContactLayer item={contact} key={contact}/>
              ))}
          </List>
        </Box>
    );
    }

    else {
    return (
        <Box
        bgcolor="white"
        flex={5}
        p={2}
      >
          <h1>Contacts</h1>
          <h2> You don't have contacts yet</h2>
          <h3>Start by adding a contact</h3>
          <Search/>
      </Box>
    )
    }
   
    

}
    

export default Contacts

// return (
//   <>
//   <Box
//     bgcolor="white"
//     flex={5}
//     p={2}
//   >
//     <h1>Contacts</h1>
//     <Box sx={{width:500}}>
//         <h2>You dont have contacts yet</h2>
//         <h3>Start by adding a contact</h3>
//         <Search/>
//     </Box>
//   </Box>
//   </>
// )



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