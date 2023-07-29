import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/client';
import ACCEPT_CONTACT_REQUEST from "../gql/acceptContact"
import DELETE_CONTACT from "../gql/deleteContact"
import ChatContainer from '../components/ChatContainer';
import ChatContacts from '../components/ChatContacts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';


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
    const [alert, setAlert] = useState("");

    const {t} = useTranslation();

    const navigate = useNavigate();

    const { chatId } = useParams();
    const { currentRoom, chatMember } = useSelector(
        (state) => state.chat
    );

    const dispatch = useDispatch();

    const { contacts, username, image } = useSelector(
      (state) => state.user.value
    );

    const { notifications } = useSelector(
        (state) => state.chat
      );

    useSubscription(ACCEPT_CONTACT_REQUEST, {
      onData: (data) => {
        dispatch({
            type: "isFetchingContact"
          })

        dispatch({
          type: "acceptRequest",
          payload: data.data.data.acceptContactRequest,
      })
      },
      onError: (error) => {
          console.log(error)
      }
    })

    const handleCloseAlert = () => {
        setAlert("")
      }

    useSubscription(DELETE_CONTACT, {
        onData: (data) => {
          dispatch({
            type: "deletedContact",
            payload: data.data.data.deleteContact,
          })
          setAlert(t("removedFromFriendList"))
          setCurrentChat(undefined)
          navigate("/dashboard/chat/0")
        },
        onError:(error) => {
          console.log(error)
        }
    })

    let contactsArray = [];
    if (contacts.length !== 0) {
        for (let i = 0; i<  contacts.length; i++){
            contactsArray.push(contacts[i])
        }
    }

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
        dispatch({
            type: "createNewRoom",
            payload: {
                newRoom:{
                    createdBy: username,
                    member: chat
                }
            }
        })
    }

    
    useEffect(() => {
        if(chatId){
        dispatch({
            type:"queryMessages",
            payload: 
            {
                queryInput: {
                    chatId: chatId,
                    from: username
                }
            }
        })}
        else{
            navigate(`/dashboard/chats`)
        }
    }, [chatId])

    useEffect(() => {
        if (contactsArray.length !== 0){
            dispatch({
                type: "getContactData",
                payload: {
                    contactDataInput:{
                        usernameArray: contactsArray
                    }
                }
            })
        }
        dispatch({
            type: "setCurrentChat",
        })
    }, [])

    return (
        <BoxContainer sx={{height: "100vh"}}>
            <Box sx={{padding:"1rem", height: "85vh", width: "85vw", backgroundColor:"#00000076", display: "grid", gridTemplateColumns: "25% 75%"}}>
                <ChatContacts contactsArray={contactsArray} currentMember={username} changeChat={handleChatChange} avatarProfile={image} notifications={notifications}/>
                {currentChat === undefined ? 
                    <Box sx={{color: "white"}}>
                    {alert && 
                        <Stack spacing={2} paddingBottom={2} sx={{color:"#f9c507"}}>
                            <Box>
                            <ErrorIcon/>
                            <CloseIcon 
                                onClick={handleCloseAlert}
                                sx={{
                                cursor: "pointer",
                                marginLeft: "3rem",
                                color: "red"
                                }}
                            />
                            </Box>
                            <Typography variant="h6">
                                {alert}
                            </Typography>
                        </Stack>
                    }
                        {t("selectContact")}
                        
                    </Box> 
                    :
                    <ChatContainer currentChat={currentChat} currentMember={username}/>
                }
            </Box>
        </BoxContainer>
    )
}

export default Chat
