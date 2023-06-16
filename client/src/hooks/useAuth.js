import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import {login, registration} from "../http/userAPI";
import {SHOP_ROUTE} from "../utils/consts";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // const click = async () => {
    //     try {
    //         let data;
    //         if (isLogin) {
    //             data = await login(email, password);
    //         } else {
    //             data = await registration(email, password);
    //         }
    //         user.setUser(user)
    //         user.setIsAuth(true)
    //         navigate(SHOP_ROUTE)
    //
    //     } catch (e) {
    //         alert(e.response.data.message)
    //     }
    // }
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const login = async (data) => {
        setUser(data);
        navigate(SHOP_ROUTE, { replace: true });
    };

    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    return useContext(AuthContext);

};
