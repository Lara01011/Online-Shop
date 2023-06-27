import React, {useContext, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import Footer from "./components/Footer/Footer";
import './App.css';
import NevNavbar from "./components/NavBar/NewNavBar";
import Trait from './components/Trait/Trait';




const App = observer(() => {

    const {user} = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([]);
    const [logos, setLogos] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [snackbar, setSnackbar] = useState({
        message: "",
        open: false,
        severity: ""
    })
    // this.state = {
    //         orders: [],
    //         items: [
    //
    //         ]
    //     }




    // useEffect(() => {

    //     check().then(data => {
    //         // user.setUser(true)
    //         user.setIsAuth(true)
    //     }).finally(() => setLoading(false))
    // }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (

        <BrowserRouter>
             
            <NevNavbar/>
            <AppRouter/>
            <Trait/>
            <Footer/>

        </BrowserRouter>
    );


});
export default App;
