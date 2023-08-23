import Feed from "../components/Feed"

const Dashboard = () => {
    return (
        <Feed/>
    )
  }
  
  export default Dashboard

// import React from 'react'
// import { Box, Stack, Typography } from '@mui/material'
// import { styled } from '@mui/material/styles';
// import { useState, useEffect } from 'react';
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { useSubscription } from '@apollo/client';
// import ACCEPT_CONTACT_REQUEST from "../gql/acceptContact"
// import DELETE_CONTACT from "../gql/deleteContact"
// import ChatContainer from '../components/ChatContainer';
// import ChatContacts from '../components/ChatContacts';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from "react-i18next";
// import Feed from "../components/Feed"
// import ErrorIcon from '@mui/icons-material/Error';
// import CloseIcon from '@mui/icons-material/Close';


// const BoxContainer = styled(Box)(() => ({
//     height: "100vh",
//     width: "100vw",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     gap: "1rem",
//     alignItems: "center",
//     backgroundColor: "#131324"
//   }));

// const Dashboard = () => {

//     const [ currentChat, setCurrentChat] = useState(undefined); 

//     const navigate = useNavigate();

//     const dispatch = useDispatch();

//     const { contacts, username, image } = useSelector(
//       (state) => state.user.value
//     );

//     const { notifications } = useSelector(
//         (state) => state.chat
//       );

//     let contactsArray = [];
//     if (contacts.length !== 0) {
//         for (let i = 0; i<  contacts.length; i++){
//             contactsArray.push(contacts[i])
//         }
//     }

//     const handleChatChange = (chat) => {
//         if(chat !== "undefined"){
//             setCurrentChat(chat);
//             dispatch({
//                 type: "createNewRoom",
//                 payload: {
//                     newRoom:{
//                         createdBy: username,
//                         member: chat
//                     }
//                 }
//             })
//         }
//         else {
//             return
//         }
//     }


//     useEffect(() => {
//         if (contactsArray.length !== 0){
//             dispatch({
//                 type: "getContactData",
//                 payload: {
//                     contactDataInput:{
//                         usernameArray: contactsArray
//                     }
//                 }
//             })
//         }
//         dispatch({
//             type: "setCurrentChat",
//         })
//     }, [])

//     return (
//         <BoxContainer sx={{height: "100vh"}}>
//             <Box sx={{padding:"1rem", height: "100vh", width: "100vw", backgroundColor:"#00000076", display: "grid", gridTemplateColumns: "25% 75%"}}>
//             <ChatContacts contactsArray={contactsArray} currentMember={username} changeChat={handleChatChange} avatarProfile={image} notifications={notifications}/>
//             <Feed/>
//             </Box>
//         </BoxContainer>
//     )
// }

// export default Dashboard
