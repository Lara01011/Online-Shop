import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";

import {Link, useNavigate} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";
import {MdAddShoppingCart} from "react-icons/md";
import {GiBinoculars} from "react-icons/gi";
import {CardContent, CardMedia} from "@mui/material";
import {Box} from "@mui/system";
import styles from "../components/DeviceItemCard.module.scss";


const DeviceItem = ({ device, cartItems, setCartItems }) => {
    const [busketItems, setCartItemss] = useState()
    const navigate = useNavigate();
    const addToBasket = (item) => {
        const busketItems = localStorage.getItem('busketItems');
        if(busketItems){
            let buskItms = JSON.parse(busketItems)
            if (buskItms.length && buskItms.some((cartItem) => cartItem.product.id === item.id)) {
                      
                        const updatedBuskItms = buskItms.map((cartItem) => {
                            if (cartItem.product.id === item.id) {
                              return {
                                ...cartItem,
                                amount: cartItem.amount + 1
                              };
                            }
                            return cartItem;
                          });
                    const addToLocalStore = JSON.stringify(updatedBuskItms)
                    localStorage.setItem('busketItems', addToLocalStore)
                    setCartItemss(addToLocalStore)

                        return;
                }
                    buskItms.push({product: item, amount: 1})
                    const addToLocalStore = JSON.stringify(buskItms)
                    localStorage.setItem('busketItems', addToLocalStore)
                    setCartItemss(addToLocalStore)
            }
            else{
                const items = JSON.stringify([
                    {product: item, amount: 1}
                ])
                localStorage.setItem('busketItems',items)
                 setCartItemss(items)
            }
    };

    const stop = (e) => {
        e.stopPropagation();
        console.log(1);
    };

    const goHome = () => {
        navigate(DEVICE_ROUTE + '/' + device.id);
    };
useEffect(()=>{
    console.log(1);
   
    // setCartItemss(busketItems)
},[busketItems, localStorage.getItem('busketItems')])
    return (
        <Card
            style={{ boxShadow: 'none', width: 'auto', ...device.sty }}
            sx={{ height: '100%' }}
            className={`${styles.card} card`}
        >
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
                className={styles.imageDiv}
            >
                <CardMedia
                    component="img"
                    image={process.env.REACT_APP_API_URL + device.img}
                    onClick={goHome}
                    alt="green iguana"
                    sx={{ width: '100%' }}
                />

                <div className={styles.bottom}>
                    <div className={styles.content}>
                        <div productid={device.id} onClick={() => addToBasket(JSON.parse(JSON.stringify(device)))}>
                            <MdAddShoppingCart />
                            <div>add to cart</div>
                        </div>
                        <div className={styles.rode}></div>
                        <Link onClick={goHome}>
                            <GiBinoculars />
                            <div>quick view</div>
                        </Link>
                    </div>
                </div>
            </Box>
            <CardContent className={styles.cardContent}>
                <div onClick={goHome} className={styles.title}>
                    {device.name}
                </div>
                <p
                    style={device?.children && { color: '#EF837B' }}
                    className={styles.price}
                >
                    ${device.price} {device?.children && device.children}
                </p>
            </CardContent>
        </Card>
    );
};

export default DeviceItem;