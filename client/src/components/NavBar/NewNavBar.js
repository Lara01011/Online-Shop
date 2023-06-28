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
import logo from '../../img/Bedding.png';
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
      <AppBar position="static" className={styles['custom-app-bar']}>
        <Toolbar className={styles['toolbar']}>
          <TypeBar />

          <Typography variant="h6" component="div" className={styles['logo-wrapper']}>
            <Link to="/" className={styles['logo-link']}>
              <Box width={50} height={40} component="img" src={logo} alt="logo" className={styles['logo']} />
              <span className={styles['logo-name']}>Bedding shop</span>
            </Link>
          </Typography>

          {token && (
            <Box className={styles['user-options']}>
              {jwtDecode(token).role === 'ADMIN' && (
                <Button variant="outline-light" onClick={admin_panel}>
                  Админ панель
                </Button>
              )}
              <Button variant="outline-light" onClick={logOut} className={`${styles['ml-2']} ${styles['flex-row']}`}>
                Выйти
              </Button>
            </Box>
          )}
          {!token && (
            <Box className={styles['user-options']}>
              <Button variant="outline-light" onClick={login}>
                Авторизация
              </Button>
            </Box>
          )}
          <Box
            className={`${styles['icon-wrapper']} ${styles['ml-2']} ${styles['flex-row']}`}
            onClick={basket_link}
          >
            <span className={styles['count']}>{count}</span>
            <ShoppingCartOutlinedIcon className={styles['icon-card']} />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
});

export default NevNavbar;
