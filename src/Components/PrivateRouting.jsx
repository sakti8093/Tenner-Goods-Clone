
import { useContext } from "react";
import { AuthContext } from "../Context/ContextProvider";
import { Navigate } from "react-router-dom";

function PrivateRouting({children}) {

    const token=localStorage.getItem("token");
    const {isAuth}=useContext(AuthContext);

    if(!token){
       
       return <Navigate to='/login' />

    }
    return children
}

export default PrivateRouting;