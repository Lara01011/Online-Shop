import { AppBar, Container, Box } from '@mui/material';
import React, { useEffect, useState, createContext, useContext } from 'react';
import Call from './Call';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import styles from "./Styles.module.scss";
import logo from "../../img/logo.png"

import {Link, useNavigate} from 'react-router-dom';
// import SignIn from "./SignIn";
// import SignInSignUp from "./SignInSignUp";
import {observer} from "mobx-react-lite";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import auth from "../../pages/Auth";
import {Button, Nav} from "react-bootstrap";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import jwtDecode from "jwt-decode";


const NevNavbar = observer( () => {
    let token = localStorage.getItem('token')
    const logOut = () =>{
        user.setUser({})
        localStorage.removeItem('token')
        navigate('/')
        user.setIsAuth(false)

    }

    let [cartOpen, setCartOpen] = useState(false)
    const [count, setCount] = useState()
    let navigate = useNavigate()
    const admin_panel = () => {
        let path = ADMIN_ROUTE;
        navigate (path);
    };

    const basket_link = () => {
        let path = BASKET_ROUTE;
        navigate (path);
    };

    const login = () =>{
        let path = LOGIN_ROUTE;
        navigate(path);
    }

    const {user} = useContext(Context)
    useEffect(() => {
    
   
        const items = localStorage.getItem('busketItems')
            
           
        const busketItems = JSON.parse(items)
            if (busketItems) {
                
               
        setCount(busketItems.length)
            }
        })

    return (
                  <div style={{position:'sticky', top:0, zIndex:999}}>
        <AppBar position='relative' component="nav" sx={{ background: "#333333"}}>
            <Container>
                <Box display={"flex"} justifyContent={"space-between"} py={"8.5px"}>
                
                    <Call />
                    <div style={{display:"flex", alignItems:'center'}}><Link to={'/'}>
                        <Box component={"img"} src={logo} alt="logo" />
                    </Link></div>
                    



                    {
                        (auth.currentUser && !auth.currentUser.isAnonymous) ?
                            <h5 className={styles.username}>{auth.currentUser.displayName}</h5> :
                            <Box display={"flex"} justifyContent={"space-between"} margin={"2rem 0"}>
                    <Box component={"div"} sx={{display: "flex"}}>
                        {token ?
                            <Nav className="flex-row ml-3" style={{color: 'White'}}>
                                {jwtDecode(token).role === "ADMIN"?<Button 
                                        variant={"outline-light"}
                                        onClick={admin_panel}
                                >       Админ панель
                                </Button>:null}

                                <Button variant={"outline-light"}
                                        onClick={()=> logOut()}
                                        className="ml-2 flex-row"
                                >Выйти
                                </Button>
                            </Nav>
                            :
                            <Nav className="ml-auto" style={{color: 'White'}}>
                                <Button variant={"outline-light"} onClick={login}>Авторизация</Button>
                            </Nav>
                        }
                    </Box>


                            {/*<h5 className={styles.username}>Name</h5>*/}
                            {/*<button onClick={handleOpenModal}>singleup</button>*/}


                    
                    <Box component={"div"} sx={{display: "flex", marginLeft:5, alignItems:'center', cursor:'pointer'}}>
                        {/*{*/}
                        {/*    isModal?*/}
                        {/*        <div style={{zIndex:999}}><SignIn/></div>*/}
                        {/*        :*/}
                        {/*        null*/}
                        <span>{count}</span>
                        <ShoppingCartOutlinedIcon onClick={basket_link} className="icon-card"/>
                        {/*<Link  src={LocalMallIcon}>Card</Link>*/}
                    </Box>
                </Box>


                    }
                </Box>
                <hr className={styles.hr} />
                
            </Container>
        </AppBar>
                  </div>
    );
})

export default NevNavbar;