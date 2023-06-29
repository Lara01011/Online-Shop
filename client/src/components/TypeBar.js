import React, { useContext, useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const handleTypeClick = (type) => {
    device.setSelectedType(type);
  };

  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, []);

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };

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

      <div style={{ display: openMenu ? 'block' : 'none', paddingRight: 'inherit' }}>
        <Menu
          anchorReference="anchorPosition"
          anchorPosition={{ top: 0, left: 0 }}
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          style={{
            position: 'fixed',
            width: '297px',
            zIndex: 2000,
          }}
          ref={menuRef}
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
