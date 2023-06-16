import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Row} from "react-bootstrap";
import CreateBrend from "../components/modals/CreateBrend";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import {Context} from "../index";
import DeviceItem from '../components/DeviceItem';
import { Box } from '@mui/system';
import { CardContent, CardMedia } from '@mui/material';
import { MdAddShoppingCart } from 'react-icons/md';
import { GiBinoculars } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../components/DeviceItemCard.module.scss";
import {DEVICE_ROUTE} from "../utils/consts";
import { deleteOne } from '../http/deviceAPI';

const Admin = () => {
    const navigate = useNavigate();

    const {device} = useContext(Context)
    const [brendVisible, setBrendVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [deleteItem, setDeleteItem] = useState()
    const goHome = () => {
        navigate(DEVICE_ROUTE + '/' + device.id);
    };
    const deleteItems = (device) => {
        deleteOne(device.id);
    }
    useEffect(()=>{
        console.log(1);
    },[])
    return (
        <>
        <Container className="d-flex flex-column">

            <Button
                variant={"outline-dark"}
                className="mt-2"
               onClick={()=> setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2"
                onClick={()=> setBrendVisible(true)}

            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2"
                onClick={()=> setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>

            <CreateBrend show={brendVisible} onHide={() =>setBrendVisible(false) }/>
            <CreateDevice show={deviceVisible} onHide={() =>setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() =>setTypeVisible(false)}/>
        </Container>
        <Row className="d-flex">
            {device.devices.map(device =>
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
    
                    <div>
                    <div className={styles.bottom}>
                        <div className={styles.content}>
                            <div productid={device.id} onClick={() => deleteItems(JSON.parse(JSON.stringify(device)))}>
                                <MdAddShoppingCart />
                                <h5>delete</h5>
                            </div>
                            <div className={styles.rode}></div>
                            <Link onClick={goHome}>
                                <GiBinoculars />
                                <h5>quick view</h5>
                            </Link>
                        </div>
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
            )}

        </Row>
</>

    );
};

export default Admin;