import React from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const BoxContainer = styled(Box)(() => ({
    height:"80%",
    color: "white"

  }));

const ChatMessages = () => {

  const { value } = useSelector(
    (state) => state.chat
  );

  let messages = value

  return (
    <BoxContainer
      // chatmessages
    >
      {
        messages.map((message) => {
          return (
            <Box>
              <Box
                // message
              >
                <Box
                  // content
                >
                  <p>
                    {message.text}
                  </p>
                </Box>
              </Box>
            </Box>
          )
        })
      }
    </BoxContainer>
  )
}

export default ChatMessages