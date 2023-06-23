import React, {useContext, useEffect, useState} from 'react';
import {Col, Container} from "react-bootstrap";
import {Row} from "react-bootstrap"
import TypeBar from "../../components/TypeBar";
import BrendBar from "../../components/BrendBar";
import DeviceList from "../../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchBrends, fetchDevice, fetchTypes} from "../../http/deviceAPI";
import Pages from "../../components/Pages";
import BigSlider from "../../components/BigSlider";
import Footer from "../../components/Footer/Footer";
import Header from "./sections/Header/Header";
import NevNavbar from "../../components/NavBar/NewNavBar";
import DealsOutlet from "./Deals&Outlet/Deals&Outlet";
import Basket from "../Basket/Basket";
import Trait from '../../components/Trait/Trait';



const Shop = observer(() => {



    const {device} = useContext(Context)


    useEffect(()=>{
        fetchTypes().then(data => device.setTypes(data))
        fetchBrends().then(data => device.setBrends(data))
        fetchDevice(null, null, 1, 9).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })

    }, [])
    useEffect(()=> {
        fetchDevice(device.selectedType.id, device.selectedBrend.id, device.page, 9).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
        }, [device.page, device.selectedType, device.selectedBrend,])
        useEffect(() => {
            window.scrollTo(0, 0);
          }, []);
    return (
        <Container>
            
            <Header/>
            <BigSlider/>
            <Row className="mt-3" >

                <Col md={3}>
                    
                </Col>
                    <Col md={9}>
                        <BrendBar/>
                        <DeviceList/>

                        <Pages/>

                </Col>
            </Row>
            <DealsOutlet/>
            <Trait/>

        </Container>
    );
});

export default Shop;