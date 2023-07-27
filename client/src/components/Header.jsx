import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import CONTACT_REQUEST from '../gql/contactRequest'
import { useSubscription } from '@apollo/client';
import { useTranslation } from "react-i18next"
import {useEffect} from "react"
import LanguageMenu from './LanguageMenu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import avatar from "../assets/profile-image.jpeg"

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const ITEM_HEIGHT = 48;


function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { image, username } = useSelector(
    (state) => state.user.value
  );

  useSubscription(CONTACT_REQUEST, {
    onData: (data) => {
      dispatch({
        type: "addNewRequest",
        payload: data.data.data.addContactRequest,
    })
    },
    onError: (error) => {
        console.log(error)
    }
})

  const { requests } = useSelector(
    (state) => state.user.value
);

  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  const handleLogout = () => {
    dispatch({
      type: "setUserAuth",
      payload: {
        data:{}
      }
    })
    localStorage.removeItem('token');
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {language} = useSelector(
    (state) => state.user
  );

  useEffect (() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  },[language])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.id);
    localStorage.setItem("language",e.target.id)
    setAnchorEl(null);
  }

  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TouchAppIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 300,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            inTouch
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* Here starts the menu options */}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={"/dashboard"} style={{textDecoration:"none", color:"black"}}>
                    {t("profile")}
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={"/dashboard/contacts"} style={{textDecoration:"none", color:"black"}}>
                    {t("friends")}
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={"/dashboard/chat/0"} style={{textDecoration:"none", color:"black"}}>
                    {t("messages")}
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={"/dashboard/groups/0"} style={{textDecoration:"none", color:"black"}}>
                    {t("groups")}
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={"/dashboard/requests"} style={{textDecoration:"none", color:"black"}}>
                    {t("invites")}
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={"/dashboard/requests"} style={{textDecoration:"none", color:"black"}}>
                    {t("logout")}
                    </Link>
                  </Typography>
                </MenuItem>
            </Menu>
          </Box>
          <TouchAppIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 300,
              fontSize: 10,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            inTouch
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                <Link to={"/dashboard"} style={{textDecoration: "none", color:"white"}}>
                      {t("profile")}
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                <Link to={"/dashboard/contacts"} style={{textDecoration: "none", color:"white"}}>
                      {t("friends")}
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                <Link to={"/dashboard/chat/0"} style={{textDecoration: "none", color:"white"}}>
                      {t("messages")}
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                <Link to={"/dashboard/groups/0"} style={{textDecoration: "none", color:"white"}}>
                      {t("groups")}
                </Link>
              </Button>
              <Button 
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  <Link to={"/dashboard/requests"} style={{textDecoration: "none", color:"white"}}>
                    {t("invites")}
                  </Link>
              </Button>
          </Box>

          <div>
            {username}
          </div>
          <LanguageMenu/>
          <div>
            <IconButton
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Avatar">
                    {image ? 
                    <Avatar alt="Remy Sharp" src={image} />
                    : 
                    <Avatar alt="Remy Sharp" src={avatar} />
                    }
                </Tooltip>
              </Box>
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {/* <Button
                onClick={handleLogout}
                sx={{ my: 2, color: 'white', display: 'block', paddingLeft:20 }}
              > 
                {t("logout")}
              </Button> */}
              <MenuItem  onClick={handleLogout}>
                {t("logout")}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header