import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../Provider/Provider";


const PrivateRoute = ({children}) => {
    const {user} = useContext(authContext);
    const location = useLocation();

    if(user){
        return children
    }

    return <Navigate to={'/signUp'} state={{from: location.pathname}} replace />
};

export default PrivateRoute;