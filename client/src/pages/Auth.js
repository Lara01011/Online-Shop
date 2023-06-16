import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Box} from "@mui/material";
import styles from "../components/NavBar/Styles.module.scss";


const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // const [inputValue, setInputValue] = useState({
    //     email: "",
    //     password: ""
    //  });
    //
    //  const focusHandler = (event) => {
    //      [event.target.id]: true}
    //  };



    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)

        } catch (e) {
            alert(e.response.data.message)
        }
    }



    return (
       <Container
           className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>

            <Card className="p-5" style={{width: "600"}}>
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">

                    <Form.Control
                    className="mt-3"
                    placeholder="Email Address *"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                     />
                    <Form.Control
                    className="mt-3"
                    placeholder="Password *"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    />

                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                net akaunta? <NavLink to={REGISTRATION_ROUTE}>Registacia</NavLink>
                            </div>
                            :
                            <div>
                                est akaunt? <NavLink to={LOGIN_ROUTE}>Vaydite</NavLink>
                            </div>

                        }
                        <Button onClick={click}
                    variant={"outline-success"}
                    >
                            {isLogin ? ' Login' : 'Registracia'}
                      </Button>
                    </Row>
                    </Form>
                    </Card>


       </Container>












    );
});

export default Auth;