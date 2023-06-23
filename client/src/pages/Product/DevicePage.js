import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useContext, useState, useCallback } from 'react';
// import { Context } from "App";
import styles from "./../Product/Styles.module.scss";
import { Breadcrumbs, Container, Grid, Link as BCLink, Rating } from '@mui/material';
import { AddShoppingCart, NavigateNext} from "@mui/icons-material";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";
import {fetchOneDevice} from "../../http/deviceAPI";
import {Context} from "../../index";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const [busketItems, setCartItemss] = useState()
    const {id} = useParams()
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





    const navigate = useNavigate();
    const {cartList, setCartList} = useContext(Context);
    const [imageIndex, setImageIndex] = useState(0);
    const [revImgArr, setRevImgArr] = useState([]);
    const [amount, setAmount] = useState(1);
    const [bgPosition, setBgPosition] = useState("50% 50%");


    useEffect(()=>{
        fetchOneDevice(id).then(data => setDevice(data))
    },[])

    // useEffect(() => {
    //     if (product.length !== 0) {
    //         setRevImgArr(product[productID].urls.reverse());
    //     }
    //     return () => {
    //         if(product[productID]) {
    //             setRevImgArr(product[productID].urls)
    //         }
    //     }
    // }, [])

    // useEffect(() => {
    //     if (product.length !== 0 && !product[productID]) {
    //         navigate("/", {replace: true});
    //     }
    //
    //     if (product.length !== 0) {
    //         setRevImgArr(product[productID].urls.reverse());
    //     }
    //
    // }, [product, productID, navigate])

    const handleClick = (event) => {
        event.preventDefault();
        navigate(event.target.pathname)
    }

    const changeMainImage = useCallback((event) => {
        const selectedImgIndex = Number(event.currentTarget.getAttribute("imgindex"));
        setImageIndex(selectedImgIndex);
    }, [])

    function randomNumber() {
        return Math.floor(Math.random() * (5 - 1 + 1) + 1)
    }

    const changeAmount = (qty) => {
        if ((qty + amount) >= 1) {
            setAmount(prevState=> prevState + qty)
        }
    }

    const addToCart = (event) => {
        const productID = event.currentTarget.id;
        if (cartList.some((cartItem) => cartItem.product === productID)) {
            setCartList((cart) =>
                cart.map((cartItem) =>
                    cartItem.product === productID
                        ? {
                            ...cartItem,
                            amount: cartItem.amount + amount
                        }
                        : cartItem
                )
            );
            return;
        }
        setCartList((cart) => [
            ...cart,
            {product: productID, amount: amount }
        ]);
    }

    const zoom = (e) =>{
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.clientX - left) / (width) * 100;
        const y = (e.clientY - top) / (height) * 100;
        setBgPosition(`${x}% ${y}%`)
    }
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div>


                <Container sx={{pb: "1rem"}}>
                    <div role="presentation" onClick={handleClick}>
                        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />} sx={{p: "14px 0"}}>
                            <BCLink
                                className={styles.brdHov}
                                underline="none"
                                color="inherit"
                                href="/"
                                fontSize={"14px"} >
                                Home
                            </BCLink>
                            <BCLink
                                underline="none"
                                color="text.primary"
                                href="/wishlist"
                                aria-current="page"
                                fontSize={"14px"} >
                                Shopping Cart
                            </BCLink>
                        </Breadcrumbs>
                    </div>
                    <Grid container spacing={2} sx={{justifyContent: "center"}}>
                        <Grid item md={6} className={styles.left}>
                            <div className={styles.images}>

                                     <img onClick={changeMainImage} imgindex={device.img} className={device.img === imageIndex ? styles.activeImage : styles.notActive} src={process.env.REACT_APP_API_URL + device.img} key={device.img} alt={"images"} />

                            </div>
                            <div className={styles.mainImage} onMouseMove={zoom} style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + device.img})`, backgroundPosition: bgPosition}}>
                                <img src={process.env.REACT_APP_API_URL + device.img} alt="mainImage" />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className={styles.right}>
                                <h1>{device.name}</h1>
                                <div className={styles.rate}>
                                    <Rating name="read-only" size='small' value={randomNumber()} readOnly />
                                    <p>({randomNumber()} Reviews)</p>
               {/*                     {device.info.map((info, index) =>*/}
               {/*<Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>*/}
               {/*    {info.title}: {info.description}*/}
               {/*</Row>*/}
               {/*)}*/}
                                </div>

                                <p className={styles.price}>${device.price}</p>
                                {device.info.map((info, index) =>

                                <p className={styles.description} key={info.id}> {info.title} {info.description}</p>
                                    )}
                                <div className={styles.quantity}>
                                    <div>
                                        <button onClick={(event) => changeAmount(-1)}>
                                            <HiMinus />
                                        </button>
                                        <input type={"number"} min={1} value={amount} readOnly/>
                                        <button onClick={(event) => changeAmount(+1)}>
                                            <HiPlus />
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.buttons}>
                                    <button className={styles.addToCardBtn} onClick={() => addToBasket(JSON.parse(JSON.stringify(device)))} id={device.id}>
                                        <AddShoppingCart />
                                        ADD TO CART
                                    </button>

                                </div>
                                <div className={styles.end}>

                                    <div className={styles.socials}>
                                        <p>Share on:</p>
                                        <div className={styles.socialsIcon}>
                                            <div><FaFacebookF /></div>
                                            <div><FaTwitter /></div>
                                            <div><FaInstagram /></div>
                                            <div><FaYoutube /></div>
                                            <div><FaPinterest /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            
        </div>
    );
}

export default React.memo(DevicePage);
// import React from 'react';
// import {useEffect, useState} from 'react';
// import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
// import bigStar from "../../assets/star.png"
// import {useParams} from 'react-router-dom'
// import {fetchOneDevice} from "../../http/deviceAPI";
// import { useNavigate } from "react-router-dom";
//
//
// // import styles from "./Styles.module.scss";
// const DevicePage = () => {
//     const [device, setDevice, handleClick] = useState({info: []})
//     const {id} = useParams()
//
//
//
//     useEffect(()=>{
//       fetchOneDevice(id).then(data => setDevice(data))
//     },[])
//
//         return (
//         <Container className="mt-3">
//             <Row>
//                 <Col md={4}>
//                     <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
//
//                 </Col>
//                 <Col md={4}>
//                     <Row className="d-flex flex-column align-items-center">
//                         <h2 className="col-md-auto">{device.name}</h2>
//                         <div
//                             className="d-flex align-items-center justify-content-center"
//                             style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize:'cover', fontSize:64}}
//                         >
//                             {device.rating}
//                         </div>
//                     </Row>
//
//                 </Col>
//                 <Col md={4}>
//                <Card
//                className="d-flex flex-column align-items-center justify-content-around"
//                style={{width:300, height:300, fontSize:32, border: '5px solid lightgray'}}
//                >
//
//                    <h3>От: {device.price} руб.</h3>
//                    <Button onClick={()=> handleClick} variant={"outline-dark"}>Добавить в корзину</Button>
//                </Card>
//                 </Col>
//             </Row>
//           <Row className="d-flex flex-column m-3">
//               <h1>Характеристики</h1>
//               {device.info.map((info, index) =>
//               <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
//                   {info.title}: {info.description}
//               </Row>
//               )}
//           </Row>
//         </Container>
//     );
// };
//
// export default DevicePage;