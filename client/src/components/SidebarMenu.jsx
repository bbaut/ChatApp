import React from 'react'
import { Typography, Box, Tooltip, Avatar, Button, Link,MenuItem, IconButton, Menu } from '@mui/material'
import { useTranslation } from "react-i18next"
import avatar from "../assets/profile-image.jpeg"
import ChatIcon from '@mui/icons-material/Chat';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LanguageMenu from './LanguageMenu';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';

const SidebarMenu = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleSetOption = (option) => {
        dispatch({
            type: "setDisplay",
            payload: option,
        })
    }
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  return (
        <>
            <Box
            sx={{
              display: {xs: "none", sm: "none", md: "none", lg: "flex"},
              alignItems: "center",
              justifyContent: "center",
              gap: "0rem",
            }}
          >
            <Button
                onClick={() => {handleSetOption("chats")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                      <ChatIcon/>
              </Button>
            <Button
                onClick={() => {handleSetOption("groups")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                      <PeopleAltIcon/>
              </Button>
            <Button
                onClick={() => {handleSetOption("contacts")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                      <ContactsIcon/>
              </Button>
            <Button
                onClick={() => {handleSetOption("requests")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                      <PersonAddAltIcon/>
              </Button>
              <LanguageMenu/>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', lg: 'none'} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{color: "white"}}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'block' },
              }}
            >

                <MenuItem onClick={handleCloseNavMenu}>
                <Button
                onClick={() => {handleSetOption("chats")}}
                sx={{ my: 1, color: 'inherit', display: 'block' }}
              > 
                      <ChatIcon/>
              </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                <Button
                onClick={() => {handleSetOption("groups")}}
                sx={{ my: 1, color: 'inherit', display: 'block' }}
              > 
                      <PeopleAltIcon/>
              </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                <Button
                onClick={() => {handleSetOption("contacts")}}
                sx={{ my: 1, color: 'inherit', display: 'block' }}
              > 
                      <ContactsIcon/>
              </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                <Button
                onClick={() => {handleSetOption("requests")}}
                sx={{ my: 1, color: 'inherit', display: 'block' }}
              > 
                      <PersonAddAltIcon/>
              </Button>
                </MenuItem>
                <MenuItem >
                <LanguageMenu/>
                </MenuItem>
            </Menu>
          </Box>
          </>
  )
}

export default SidebarMenu