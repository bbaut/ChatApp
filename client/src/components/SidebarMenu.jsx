import React from 'react'
import { Typography, Box, Tooltip, Avatar, Button, Link } from '@mui/material'
import { useTranslation } from "react-i18next"
import avatar from "../assets/profile-image.jpeg"
import ChatIcon from '@mui/icons-material/Chat';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LanguageMenu from './LanguageMenu';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const SidebarMenu = () => {
    const {t} = useTranslation();
    const [ currentMenuOption, setCurrentMenuOption] = useState("undefined"); 
    const dispatch = useDispatch();

    const handleSetOption = (option) => {
        dispatch({
            type: "setDisplay",
            payload: option,
        })
    }
  return (
    <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem"
            }}
          >
            <Button
                // onClick={handleCloseNavMenu}
                onClick={() => {handleSetOption("chats")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                {/* <Link to={"/dashboard/chats"} style={{textDecoration: "none", color:"white"}}> */}
                      <ChatIcon/>
                {/* </Link> */}
              </Button>
            <Button
                // onClick={handleCloseNavMenu}
                onClick={() => {handleSetOption("contacts")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                {/* <Link to={"/dashboard/chats"} style={{textDecoration: "none", color:"white"}}> */}
                      <ContactsIcon/>
                {/* </Link> */}
              </Button>
            <Button
                // onClick={handleCloseNavMenu}
                onClick={() => {handleSetOption("requests")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                {/* <Link to={"/dashboard/chats"} style={{textDecoration: "none", color:"white"}}> */}
                      <PersonAddAltIcon/>
                {/* </Link> */}
              </Button>
              <Button
                // onClick={handleCloseNavMenu}
                // onClick={handleSetChat}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                <LanguageMenu/>
              </Button>
    </Box>
  )
}

export default SidebarMenu