import React from 'react'
import { Box } from '@mui/material'
import SearchContact from '../components/SearchContact'

const Contacts = () => {
  return (
    <Box
      bgcolor="white"
      flex={5}
      p={2}
    >
      <h1>Contacts</h1>
      <Box sx={{width:500}}>
        <SearchContact/>
      </Box>

    </Box>

  )
}

export default Contacts