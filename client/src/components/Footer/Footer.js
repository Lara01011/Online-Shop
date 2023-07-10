import { Container, Grid } from '@mui/material';
import React from 'react';
import logo from '../../img/logo.png';
import styles from './FooterStyles.module.scss'
import { IoCallOutline } from 'react-icons/io5'
import List from './List';
import payments from "../../img/payments.png"
const Footer = () => {
    return (
        <Container>
            <div className={styles.main}>
                <Grid container spacing={2}>
                    <Grid item sm={6} lg={3} className={styles.grid1} paddingX={"16px"}>
                        <img src={logo} alt="logo" />
                        <p>The best part of a healthy lifestyle is a healthy sleep that will ensure you beddingshop.am online store.</p>
                        <div className={styles.call}>
                            <IoCallOutline />
                            <h5>Got Question? Call us 24/7<br />
                                <span>+374 96 906 097</span>
                            </h5>
                        </div>
                    </Grid>
                    <Grid item sm={6} lg={3} className={styles.grids} paddingX={"16px"}>
                        <List title="Useful Links" content={["About Molla", "Our Services", "How to shop on Molla", "FAQ", "Contact us"]}/>
                    </Grid>
                    <Grid item sm={6} lg={3} className={styles.grids} paddingX={"16px"}>
                        <List title="Customer Service" content={["Payment Methods", "Money-back guarantee!", "Returns", "Shipping", "Terms and conditions", "Privacy Policy"]}/>
                    </Grid>
                    <Grid item sm={6} lg={3} className={styles.grids} paddingX={"16px"}>
                        <List title="My Account" content={["Sign In", "View Cart", "My Wishlist", "Track My Order", "Help"]}/>
                    </Grid>
                </Grid>
                <hr />
            </div>
            <hr />
            <div className={styles.bottom}>
                <p>Copyright © 2019 Molla Store. All Rights Reserved.</p>
                <img src={payments} alt="payment" />
            </div>
        </Container>
    );
}

export default Footer;




// import React from 'react';
// import {
//     MDBFooter,
//     MDBContainer,
//     MDBIcon,
//     MDBInput,
//     MDBCol,
//     MDBRow,
//     MDBBtn
// } from 'mdb-react-ui-kit';
//
// const Footer = () => {
//     return (
//         <div>
//             <MDBFooter className='text-center' color='white' bgColor='dark'>
//                 <MDBContainer className='p-4'>
//                     <section className='mb-4'>
//                         <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//                             <MDBIcon fab icon='facebook-f' />
//                         </MDBBtn>
//
//                         <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//                             <MDBIcon fab icon='twitter' />
//                         </MDBBtn>
//
//                         <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//                             <MDBIcon fab icon='google' />
//                         </MDBBtn>
//
//                         <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//                             <MDBIcon fab icon='instagram' />
//                         </MDBBtn>
//
//                         <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//                             <MDBIcon fab icon='linkedin-in' />
//                         </MDBBtn>
//
//                         <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
//                             <MDBIcon fab icon='github' />
//                         </MDBBtn>
//                     </section>
//
//                     <section className=''>
//                         <form action='client/src/components/Footer/Footer'>
//                             <MDBRow className='d-flex justify-content-center'>
//                                 <MDBCol size="auto">
//                                     <p className='pt-2'>
//                                         <strong>Sign up for our newsletter</strong>
//                                     </p>
//                                 </MDBCol>
//
//                                 <MDBCol md='5' start>
//                                     <MDBInput contrast type='email' label='Email address' className='mb-4' />
//                                 </MDBCol>
//
//                                 <MDBCol size="auto">
//                                     <MDBBtn outline color='light' type='submit' className='mb-4'>
//                                         Subscribe
//                                     </MDBBtn>
//                                 </MDBCol>
//                             </MDBRow>
//                         </form>
//                     </section>
//
//                     <section className='mb-4'>
//                         <p>
//                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
//                             voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
//                             sequi voluptate quas.
//                         </p>
//                     </section>
//
//                     <section className=''>
//                         <MDBRow>
//                             <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
//                                 <h5 className='text-uppercase'>Links</h5>
//
//                                 <ul className='list-unstyled mb-0'>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 1
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 2
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 3
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 4
//                                         </a>
//                                     </li>
//                                 </ul>
//                             </MDBCol>
//
//                             <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
//                                 <h5 className='text-uppercase'>Links</h5>
//
//                                 <ul className='list-unstyled mb-0'>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 1
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 2
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 3
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 4
//                                         </a>
//                                     </li>
//                                 </ul>
//                             </MDBCol>
//
//                             <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
//                                 <h5 className='text-uppercase'>Links</h5>
//
//                                 <ul className='list-unstyled mb-0'>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 1
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 2
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 3
//                                         </a>
//                                     </li>
//                                     <li>
//                                         <a href='client/src/components/Footer/Footer#!' className='text-white'>
//                                             Link 4
//                                         </a>
//                                     </li>
//                                 </ul>
//                             </MDBCol>
//
//                                 <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
//                                     <h5 className='text-uppercase'>Contact</h5>
//                                     <p>
//                                         <MDBIcon color='secondary' icon='home' className='me-2' />
//                                         New York, NY 10012, US
//                                     </p>
//                                     <p>
//                                         <MDBIcon color='secondary' icon='envelope' className='me-3' />
//                                         info@example.com
//                                     </p>
//                                     <p>
//                                         <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
//                                     </p>
//                                     <p>
//                                         <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
//                                     </p>
//                                 </MDBCol>
//
//
//                         </MDBRow>
//                     </section>
//                 </MDBContainer>
//
//                 <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
//                     © 2020 Copyright:
//                     <a className='text-white' href='client/src/components/Footer/Footer'>
//                         MDBootstrap.com
//                     </a>
//                 </div>
//             </MDBFooter>
//         </div>
//     );
// };
//
// export default Footer;