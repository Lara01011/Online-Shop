import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import "./Style.css"


const DeviceList = observer(() => {
    // const [card, setCard] = useState([])
    const [cartItems, setCartItems] = useState([]);

    const {device} = useContext(Context)
    const handleClick = (device)=>{
        console.log(device)
    }
    console.log(cartItems)
    // useEffect(() => {
    //     const items = JSON.stringify(cartItems)
    //     localStorage.setItem('busketItems', items);
    // },[cartItems])
    return (
//         <Row className="d-flex">
//
//         <Container className={`${styles.featured} featured`}>
//
//             <Box component="div" sx={{mt: "2rem"}}>
//                 <Swiper
//                     navigation={true}
//                     pagination={{
//                         clickable: true,
//                     }}
//                     breakpoints={{
//                         640: {
//                             slidesPerView: 1,
//                             spaceBetween: 10,
//                         },
//                         768: {
//                             slidesPerView: 2,
//                             spaceBetween: 10,
//                         },
//                         1024: {
//                             slidesPerView: 3,
//                             spaceBetween: 10,
//                         },
//                         1222: {
//                             slidesPerView: 4,
//                             spaceBetween: 20,
//                         }
//                     }}
//                     modules={[Pagination, Navigation]}
//                     className={`${styles.swip} mySwiper`}
//                 >
//                     {device.devices.map(device =>
//                         <DeviceItem key={device.id} device={device} handleClick={handleClick}/>
//                     )}
//                 </Swiper>
//             </Box>
//         </Container>
// </Row>
// //     );
// // }
        <Row className="d-flex" style={{justifyContent:'center'}}>
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device} cartItems={cartItems}
                setCartItems={setCartItems}/>
            )}

        </Row>
    );
});

export default DeviceList;