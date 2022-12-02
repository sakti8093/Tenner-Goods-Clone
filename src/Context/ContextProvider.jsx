import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import Cookies from 'js-cookie'
import { Cart } from "../api";
import jwt_decode from "jwt-decode";

export const AuthContext=createContext();

function AuthContextProvider({children}) {

    let [user,setUser]=useState({});
    const [username,setUsername]=useState("");
    const [isAuth,setAuth]=useState(Cookies.get("isAuth")=="true");
    const [del,setDel]=useState(false);

    
    const HandleLogout=()=>{
        setAuth(false);
        Cookies.remove("isAuth");
        Cookies.remove("token");
    }

    const getToken=()=>{
            let token=Cookies.get("token")
            if(token){
                let res= jwt_decode(token)
            let res2=res.usersData
            setUser(res2)
            return res2;
            }else{
                return false
            }    
    }
    

    const handleDeleteCart=async(id)=>{
        await fetch (`${Cart}/${id}`,{
            method:'DELETE'
        });
        setDel( !del);
    }
    

    return <AuthContext.Provider value={{user,isAuth,HandleLogout,setAuth,username,setUsername,handleDeleteCart,del,getToken}} >{children}</AuthContext.Provider>
}

export default AuthContextProvider;