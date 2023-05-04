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
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { get_data } from '../redux/reducers/authReducer';

const pages = ['dashboard', 'contacts', 'chats'];
const settings = ['Profile', 'Account', 'Dashboard', 'Search contact', 'Logout'];


function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(get_data({}));
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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Chat app
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
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={"/dashboard"}>
                      dashboard
                    </Link>
                  </Typography>
                </MenuItem>

              {/* {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  { index === 0 ?  
                <Link to={"/dashboard"}>
                      {page}
                </Link> :
                <Link to={`${page}`}>
                      {page}
                </Link> 
              }
                  </Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            My chat app
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                <Link to={"/dashboard"}>
                      dashboard
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                <Link to={"/dashboard/contacts"}>
                      contacts
                </Link>
              </Button>
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
                logout
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header

{/* <Typography variant="body1" component="div">
                        <Link to="/" style={{textDecoration:"none", color:"white"}}>LOooGO</Link>
                    </Typography>
                    <Box alignItems="center" sx={{flexGrow:1, textAlign: "center"} }>
                        <Link to="/login" style={{textDecoration:"none", color:"white", marginRight:"10px"}}>Profile</Link>
                        <Link to="/register" style={{textDecoration:"none", color:"white"}}>Chats</Link>
                        <List>
                            <ListItem dissablePadding>
                                <ListItemButton component="a" href="#home">
                                    <ListItemIcon>
                                        <Home/>
                                    </ListItemIcon>
                                    <ListItemText primary="Homepage"/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem dissablePadding>
                                <ListItemButton component="a" href="#home">
                                    <ListItemIcon>
                                        <Home/>
                                    </ListItemIcon>
                                    <ListItemText primary="Homepage"/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box> */}

{/* <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
                            <List>
                                <ListItem dissablePadding>
                                    <ListItemButton component="a" href="#home">
                                        <ListItemIcon>
                                            <Chat/>
                                        </ListItemIcon>
                                        <ListItemText primary="Chats"/>
                                    </ListItemButton>
                                </ListItem>
                            </List>

                            <List>
                                <ListItem dissablePadding>
                                    <ListItemButton component="a" href="#home">
                                        <ListItemIcon>
                                            <PeopleOutline/>
                                        </ListItemIcon>
                                        <ListItemText primary="Contacts"/>
                                    </ListItemButton>
                                </ListItem>
                            </List>

                            <List>
                                <ListItem dissablePadding>
                                    <ListItemButton component="a" href="#home">
                                        <ListItemIcon>
                                            <AccountBox/>
                                        </ListItemIcon>
                                        <ListItemText primary="Profile"/>
                                    </ListItemButton>
                                </ListItem>
                            </List>

                            <List>
                                <ListItem dissablePadding>
                                    <ListItemButton component="a" href="#home">
                                        <ListItemIcon>
                                            <Settings/>
                                        </ListItemIcon>
                                        <ListItemText primary="Settings"/>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                    </Stack> */}