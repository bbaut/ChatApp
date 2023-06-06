import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from "react-i18next"

const options = [
  'English',
  'Español',
  'Français (France)',
  'Português (Brasil)',
  'Italiano',
  'Deutsch',
];
const codes = [
  'en',
  'es',
  'fr',
  'br',
  'it',
  'dt',
];

const ITEM_HEIGHT = 48;

export default function LanguageMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {t, i18n} = useTranslation();
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
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ my: 2, display: 'block', padding:'0 20px'}}
      >
        <LanguageIcon style={{ fill: "white" }}/>
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
        {options.map((option, index) => (
          <MenuItem id={codes[index]} key={option} selected={option === 'Pyxis'} onClick={onChangeLanguage}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}