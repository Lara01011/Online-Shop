import React, { useContext, useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Button, Menu, MenuItem, Fade } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTypeClick = (type) => {
    device.setSelectedType(type);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleMenuToggle = () => {
    setAnchorEl(anchorEl ? null : document.getElementById('type-button'));
  };

  const handleClickOutsideMenu = (event) => {
    if (!anchorEl || !anchorEl.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, [anchorEl]);

  return (
    <>
      <Button
        id="type-button"
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleMenuToggle}
        startIcon={<MenuIcon />}
      />

      <div>
        <Menu
          id="type-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
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
      </div>
    </>
  );
});

export default TypeBar;
