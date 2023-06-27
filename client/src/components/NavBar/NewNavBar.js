import React, { useEffect, useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { Context } from '../../index';
import jwtDecode from 'jwt-decode';
import TypeBar from '../TypeBar';
import logo from '../../img/logo.png';
import Call from './Call';
import styles from './../NavBar/Styles.module.scss';

const NevNavbar = observer(() => {
  let token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [count, setCount] = useState(0);

  const logOut = () => {
    user.setUser({});
    localStorage.removeItem('token');
    navigate('/');
    user.setIsAuth(false);
  };

  const admin_panel = () => {
    let path = ADMIN_ROUTE;
    navigate(path);
  };

  const basket_link = () => {
    let path = BASKET_ROUTE;
    navigate(path);
  };

  const login = () => {
    let path = LOGIN_ROUTE;
    navigate(path);
  };

  useEffect(() => {
    const items = localStorage.getItem('busketItems');
    const busketItems = JSON.parse(items);
    if (busketItems) {
      setCount(busketItems.length);
    }
  }, []);

  return (
    <>
      <AppBar position="static" sx={{ background: '#333333' }}>
        <Toolbar
          sx={{
            maxWidth: '1199px',
            margin: '0 auto',
          }}
        >
          <TypeBar />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={'/'}>
              <Box component="img" src={logo} alt="logo" />
            </Link>
          </Typography>

          <Call />

          {token && (
            <Box component="div" sx={{ display: 'flex' }}>
              {jwtDecode(token).role === 'ADMIN' && (
                <Button variant="outline-light" onClick={admin_panel}>
                  Админ панель
                </Button>
              )}
              <Button variant="outline-light" onClick={logOut} className="ml-2 flex-row">
                Выйти
              </Button>
            </Box>
          )}
          {!token && (
            <Box display="flex" justifyContent="space-between" margin="2rem 0">
              <Box component="div" sx={{ display: 'flex' }}>
                <Button variant="outline-light" onClick={login}>
                  Авторизация
                </Button>
              </Box>
            </Box>
          )}
          <Box
            component="div"
            sx={{ display: 'flex', marginLeft: 5, alignItems: 'center', cursor: 'pointer' }}
          >
            <span>{count}</span>
            <ShoppingCartOutlinedIcon onClick={basket_link} className="icon-card" />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
});

export default NevNavbar;
