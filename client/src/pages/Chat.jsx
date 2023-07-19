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
import { useTranslation } from "react-i18next"
import SEND_MESSAGE from '../gql/sendMessage';

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
    // const [ notifications, setNotifications] = useState({});
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

    const { value, isFetching, notifications } = useSelector(
        (state) => state.chat
      );
    
      let messages = value

    //   const receivedMessages = messages.filter(message =>
    //     message.sender === "received"
    //   )

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
    }, [])

    console.log(notifications)

    return (
        <BoxContainer sx={{height: "100vh"}}>
            <Box sx={{padding:"1rem", height: "85vh", width: "85vw", backgroundColor:"#00000076", display: "grid", gridTemplateColumns: "25% 75%"}}>
                <ChatContacts contactsArray={contactsArray} currentMember={username} changeChat={handleChatChange} avatarProfile={image} notifications={notifications}/>
                {currentChat === undefined ? 
                    <Box sx={{color: "white"}}>{t("selectContact")}</Box> 
                    :
                    <ChatContainer currentChat={currentChat} currentMember={username}/>
                }
            </Box>
        </BoxContainer>
    )
}

export default Chat
