import React from 'react'
import { Box } from '@mui/material'
import AddContact from '../components/AddContact'

const Contacts = () => {
  return (
    <Box
      bgcolor="white"
      flex={5}
      p={2}
    >
      <h1>Contacts</h1>
      <Box sx={{width:500}}>
        <AddContact/>
      </Box>

    </Box>

  )
}

export default Contacts