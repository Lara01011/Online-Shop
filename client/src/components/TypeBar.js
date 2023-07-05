import React, { useContext, useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuRef = useRef(null);

  const handleTypeClick = (type) => {
    device.setSelectedType(type);
  };

  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, []);

  const handleMenuToggle = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <Button
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleMenuToggle}
        startIcon={<MenuIcon />}
      />

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
        getContentAnchorEl={null}
        anchorReference="anchorEl"
        
      >
        {device?.types.map((type) => (
          <MenuItem
            style={{ cursor: 'pointer' }}
            selected={type.id === device.selectedType?.id}
            onClick={() => handleTypeClick(type)}
            key={type.id}
          >
            {type.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});

export default TypeBar;
