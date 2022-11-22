import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";


export const AuthContext=createContext();

function AuthContextProvider({children}) {

    const [isAuth,setAuth]=useState(false);

    const HandleLogin=()=>{
        setAuth(true);
    }

    
    const HandleLogout=()=>{
        setAuth(false);
        localStorage.removeItem("token");
    }

    return <AuthContext.Provider value={{isAuth,HandleLogin,HandleLogout,setAuth}} >{children}</AuthContext.Provider>
}

export default AuthContextProvider;