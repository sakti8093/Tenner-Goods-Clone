
import { useContext } from "react";
import { AuthContext } from "../Context/ContextProvider";
import { Navigate } from "react-router-dom";

function PrivateRouting({children}) {

    const {isAuth}=useContext(AuthContext);

    if(isAuth!==true){
       
       return <Navigate to='/login' />

    }

    return children
}

export default PrivateRouting;