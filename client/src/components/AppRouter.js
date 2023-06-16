import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
// import { Navigate } from "react-router-dom";
import {authRouters, publicRoutes} from "../routes";
// import  {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    let token = localStorage.getItem('token')
    const {user} = useContext(Context)

    return (

        <Routes>
            {token && authRouters.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}, ) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {/*<Navigate to ={SHOP_ROUTE}/>*/}
        </Routes>


    );
};

export default AppRouter;