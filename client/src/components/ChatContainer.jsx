import React from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { useDispatch } from 'react-redux';

const ChatContainer = ({currentChat, currentMember}) => {
    const dispatch = useDispatch();

    const handleSendMsg = async (msg) => {
        console.log(msg);
        // dispatch()
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
            <ChatMessages/>
            <ChatInput handleSendMsg={handleSendMsg}/>
        </Box>
    )
}

export default ChatContainer