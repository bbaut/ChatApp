import React from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

const BoxContainer = styled(Box)(() => ({
    height:"80%",

  }));

const ChatMessages = () => {
  return (
    <BoxContainer>ChatMessages</BoxContainer>
  )
}

export default ChatMessages