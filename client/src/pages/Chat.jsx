import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/client';
import ACCEPT_CONTACT_REQUEST from "../gql/acceptContact"
import ChatContainer from '../components/ChatContainer';
import ChatContacts from '../components/ChatContacts';
import { useNavigate } from 'react-router-dom';

const BoxContainer = styled(Box)(() => ({
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    alignItems: "center",
    backgroundColor: "#131324"
  }));

const Chat = () => {
    const [ currentChat, setCurrentChat] = useState(undefined); 

    const navigate = useNavigate();

    const { chatId } = useParams();
    const { currentRoom, chatMember } = useSelector(
        (state) => state.chat
    );

    const dispatch = useDispatch();

    const { contacts, username } = useSelector(
      (state) => state.user.value
    );


    useSubscription(ACCEPT_CONTACT_REQUEST, {
      onData: (data) => {
        dispatch({
          type: "acceptRequest",
          payload: data.data.data.acceptContactRequest,
      })
      },
      onError: (error) => {
          console.log(error)
      }
    })

    let contactsArray = [];
    if (contacts.length !== 0) {
        for (let i = 0; i<  contacts.length; i++){
            contactsArray.push(contacts[i])
        }
    }

    let id;

    const handleChatChange = (chat) => {
        setCurrentChat(chat);


        dispatch({
            type: "createNewRoom",
            payload: {
                newRoom:{
                    createdBy: username,
                    member: chat,
                }
            }
        })
    }

    useEffect(() => {
        dispatch({
            type:"queryMessages",
            payload: 
            {
                queryInput: {
                    chatId: chatId,
                    from: username
                }
            }
        })
    }, [chatId])

    return (
        <BoxContainer>
            <Box sx={{padding:"1rem", height: "85vh", width: "85vw", backgroundColor:"#00000076", display: "grid", gridTemplateColumns: "25% 75%"}}>
                <ChatContacts contactsArray={contactsArray} currentMember={username} changeChat={handleChatChange}/>
                {currentChat === undefined ? 
                    <Box sx={{color: "white"}}>Please select a chat to start messaging</Box> 
                    :
                    <ChatContainer currentChat={currentChat} currentMember={username}/>
                }
            </Box>
        </BoxContainer>
    )
}

export default Chat
// import React from 'react';
// // import { makeStyles } from '@mui/styles';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
// import Fab from '@mui/material/Fab';
// import SendIcon from '@mui/icons-material/Send';

// // const useStyles = makeStyles({
// //   table: {
// //     minWidth: 650,
// //   },
// //   chatSection: {
// //     width: '100%',
// //     height: '80vh'
// //   },
// //   headBG: {
// //       backgroundColor: '#e0e0e0'
// //   },
// //   borderRight500: {
// //       borderRight: '1px solid #e0e0e0'
// //   },
// //   messageArea: {
// //     height: '70vh',
// //     overflowY: 'auto'
// //   }
// // });

// const Chat = () => {

//   return (
//       <div>
//         <Box container>
//             <Grid item xs={12} >
//                 <Typography variant="h5" className="header-message">Chat</Typography>
//             </Grid>
//         </Box>
//         <Grid container component={Paper} 
//         // className={chatSection}
//         >
//             <Grid item xs={3}
//             // className={borderRight500}
//             >
//                 <List>
//                     <ListItem button key="RemySharp">
//                         <ListItemIcon>
//                         <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
//                         </ListItemIcon>
//                         <ListItemText primary="John Wick"></ListItemText>
//                     </ListItem>
//                 </List>
//                 <Divider />
//                 <Grid item xs={12} style={{padding: '10px'}}>
//                     <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
//                 </Grid>
//                 <Divider />
//                 <List>
//                     <ListItem button key="RemySharp">
//                         <ListItemIcon>
//                             <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
//                         </ListItemIcon>
//                         <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
//                         <ListItemText secondary="online" align="right"></ListItemText>
//                     </ListItem>
//                     <ListItem button key="Alice">
//                         <ListItemIcon>
//                             <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
//                         </ListItemIcon>
//                         <ListItemText primary="Alice">Alice</ListItemText>
//                     </ListItem>
//                     <ListItem button key="CindyBaker">
//                         <ListItemIcon>
//                             <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
//                         </ListItemIcon>
//                         <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
//                     </ListItem>
//                 </List>
//             </Grid>
//             <Grid item xs={9}>
//                 <List 
//                 // className={messageArea}
//                 >
//                     <ListItem key="1">
//                         <Grid container>
//                             <Grid item xs={12}>
//                                 <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <ListItemText align="right" secondary="09:30"></ListItemText>
//                             </Grid>
//                         </Grid>
//                     </ListItem>
//                     <ListItem key="2">
//                         <Grid container>
//                             <Grid item xs={12}>
//                                 <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <ListItemText align="left" secondary="09:31"></ListItemText>
//                             </Grid>
//                         </Grid>
//                     </ListItem>
//                     <ListItem key="3">
//                         <Grid container>
//                             <Grid item xs={12}>
//                                 <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <ListItemText align="right" secondary="10:30"></ListItemText>
//                             </Grid>
//                         </Grid>
//                     </ListItem>
//                 </List>
//                 <Divider />
//                 <Grid container style={{padding: '20px'}}>
//                     <Grid item xs={11}>
//                         <TextField id="outlined-basic-email" label="Type Something" fullWidth />
//                     </Grid>
//                     <Grid xs={1} align="right">
//                         <Fab color="primary" aria-label="add"><SendIcon /></Fab>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//       </div>
//   );
// }

// export default Chat