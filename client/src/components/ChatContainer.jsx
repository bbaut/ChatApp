import React from 'react'
import { Box, Typography } from '@mui/material'
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ChatContainer = ({currentChat, currentMember, currentRoom}) => {
    const dispatch = useDispatch();
    const {username, email} = useSelector(
        (state) => state.user.value
    )

    const handleSendMsg = async (msg, isScribble) => {
        dispatch({
            type: "createNewMessage",
            payload: {
                newMessage: {
                    chatId: currentRoom,
                    message: {
                      text: msg,
                      isScribble: isScribble
                    },
                  }
            }
        })
    }

    useEffect(() => {
        if(currentChat !== "undefined"){

        dispatch({
            type:"queryMessages",
            payload: 
            {
                queryInput: {
                    chatId: currentRoom,
                    from: username
                }
            }
        })
        }
    }, [currentRoom])

    return (
        <Box 
            sx={{
                gap: "0.1rem",
                overflow: "hidden",
                paddingTop:"1rem"
            }}
        >
            <Box 
                sx={{
                    display:"flex", 
                    justifyContent:"space-between", 
                    alignItems:"center", 
                    padding:"0 2rem"
                }}
            >
                <Box 
                    sx={{
                        display:"flex", 
                        alignItems:"center", 
                        gap:"1rem"
                    }}
                >
                    <Typography variant='h4' color="white">
                        {currentChat}
                    </Typography>
                </Box>
            </Box>
            <ChatMessages currentMember={currentMember} currentChat={currentChat}/>
            <ChatInput handleSendMsg={handleSendMsg}/>
        </Box>
    )
}

export default ChatContainer