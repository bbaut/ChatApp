import React from 'react'
import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { useDispatch } from 'react-redux';

const ChatContainer = ({currentChat, currentMember, messages}) => {
    const dispatch = useDispatch();
    const { chatId } = useParams();

    const handleSendMsg = async (msg) => {
        dispatch({
            type: "createNewMessage",
            payload: {
                newMessage: {
                    chatId: chatId,
                    message: {
                      text: msg
                    },
                    sender: currentMember
                  }
            }
        })
    }

    return (
        <Box 
            sx={{
                paddingTop:"1rem"
            }}
        >
            <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 2rem"}}>
                <Box sx={{display:"flex", alignItems:"center", gap:"1rem"}}>
                    <Typography variant='h4' color="white">
                        {currentChat}
                    </Typography>
                </Box>
            </Box>
            <ChatMessages currentMember={currentMember}/>
            <ChatInput handleSendMsg={handleSendMsg}/>
        </Box>
    )
}

export default ChatContainer