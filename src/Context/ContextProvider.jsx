import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";


export const AuthContext=createContext();

function AuthContextProvider({children}) {

    const [token,setoken]=useState("");
    const [username,setUsername]=useState("");
    const [isAuth,setAuth]=useState(false);
    const [del,setDel]=useState(false);



    const HandleLogin=async(name)=>{
        setAuth(true);
        let res1=  await fetch(`https://tinder-goods-rwact-sakti.herokuapp.com/users?username=${name}`);
        let res2= await res1.json();
        localStorage.setItem("TGID",res2[0].id);
    }

    
    const HandleLogout=()=>{
        setAuth(false);
        localStorage.removeItem("token");
        localStorage.removeItem("TGID");
        localStorage.removeItem("TGNAME");
    }
    

    const handleDeleteCart=async(id)=>{
        await fetch (`https://tinder-goods-rwact-sakti.herokuapp.com/cart/${id}`,{
            method:'DELETE'
        });
        setDel( !del);
    }
    

    return <AuthContext.Provider value={{isAuth,HandleLogin,HandleLogout,setAuth,token,setoken,username,setUsername,handleDeleteCart,del}} >{children}</AuthContext.Provider>
}

export default AuthContextProvider;