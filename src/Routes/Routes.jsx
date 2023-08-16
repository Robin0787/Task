import { createBrowserRouter, } from "react-router-dom";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: '/signUp',
        element: <SignUp />
    }
]);


export default routes;