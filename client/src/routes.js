import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, DEVICE_LIST} from "./utils/consts";
import Basket from "./pages/Basket/Basket";
import Shop from "./pages/Home/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/Product/DevicePage";
import Admin from "./pages/Admin";
import BaddingItems from "./pages/Product/badding-items";

export const authRouters = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket

    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
]
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },

    {
        path: LOGIN_ROUTE,
        Component: Auth
    },

    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },

    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },

    {
        path: DEVICE_LIST ,
        Component: BaddingItems
    },

]

