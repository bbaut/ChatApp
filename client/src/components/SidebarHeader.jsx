import { useState } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { Typography, Box, Tooltip, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useTranslation } from "react-i18next"
import avatar from "../assets/profile-image.jpeg"

const SidebarHeader = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { image } = useSelector(
    (state) => state.user.value
  );

    const ITEM_HEIGHT = 48;

    const handleLogout = () => {
        localStorage.clear()
        document.cookie = `token =;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        window.location.href = '/';
      }

      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const { auth } = useSelector(
        (state) => state.auth
      );
  return (
     <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
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
              <MenuItem  onClick={handleLogout}>
                {t("logout")}
              </MenuItem>
            </Menu>
            <Typography
              sx={{
                color:"white"
              }}
            >
              {auth.userAuthenticated.username}
            </Typography>
    </Box>
  )
}

export default SidebarHeader