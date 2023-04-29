import { Box, Typography } from '@mui/material'
import React from 'react'

const Requests = () => {
    
  return (
    <Box paddingTop={3}>
        <Typography variant='h4'>
            Requests
        </Typography>
        <Typography mt={3} variant='h6'>
            You have no request
        </Typography>
    </Box>
  )
}

export default Requests