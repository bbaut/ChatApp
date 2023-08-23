import {useEffect, useState} from "react"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { useSubscription } from '@apollo/client';
import { useTranslation } from "react-i18next"
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import CONTACT_REQUEST from '../gql/contactRequest'
import LanguageMenu from './LanguageMenu';
import avatar from "../assets/profile-image.jpeg"

const ITEM_HEIGHT = 48;

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // const { image, username } = useSelector(
  //   (state) => state.user.value
  // );

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

const navigate = useNavigate();

  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  const { auth } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch({
      type: "logout",
      payload: {
        data:{
          profileUser: {}
        }
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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetChat = () => {
    navigate("/dashboard/chats")
    dispatch({
      type: "setCurrentChat",
    })
  }
  const handleSetGroup = () => {
    navigate("/dashboard/groups")
    dispatch({
      type: "setCurrentChat",
    })
  }

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
                  <Typography textAlign="center" >
                    <Link to={"/dashboard/chats"} style={{textDecoration:"none", color:"black"}}>
                    {t("messages")}
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={"/dashboard/groups"} style={{textDecoration:"none", color:"black"}}>
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
                // onClick={handleCloseNavMenu}
                onClick={handleSetChat}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                <Link to={"/dashboard/chats"} style={{textDecoration: "none", color:"white"}}>
                      {t("messages")}
                </Link>
              </Button>
              <Button
                // onClick={handleCloseNavMenu}
                onClick={handleSetGroup}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                <Link to={"/dashboard/groups"} style={{textDecoration: "none", color:"white"}}>
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
            {auth.userAuthenticated.username}
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
                    {/* {image ? 
                    <Avatar alt="Remy Sharp" src={image} />
                    :  */}
                    <Avatar alt="Remy Sharp" src={avatar} />
                    {/* } */}
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