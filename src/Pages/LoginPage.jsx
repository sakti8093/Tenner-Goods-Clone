import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit'
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react'
import { useContext } from 'react';
import { AuthContext } from '../Context/ContextProvider';



function LoginPage() {

    const [loginuser,setLoginUser]=useState({username:"",password:""});
    const toast = useToast();

    const {isAuth,HandleLogin,HandleLogout,setAuth}=useContext(AuthContext)

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setLoginUser({...loginuser,[name]:value});
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log(loginuser)
        let registerRes = await fetch(`https://masai-api-mocker.herokuapp.com/auth/login`,{
            method: 'POST',
            body: JSON.stringify(loginuser),
            headers : {
                'content-type': 'application/json'
            }
        });

       

        let res = await registerRes.json();
        console.log(res);
        if(res.error){   
            toast({
                title: 'Error !!',
                description: res.message,
                status: 'error',
                position: 'bottom',
                duration: 4000,
                isClosable: true,
              });
             
        }
        else{
            toast({
                title: 'Logged in success.',
                description: `welcome back ${loginuser.username} `,
                status: 'success',
                position: 'bottom',
                duration: 4000,
                isClosable: true,
              });
              HandleLogin();
           localStorage.setItem("username",loginuser.username)    
           localStorage.setItem("token",res.token)
        }
    }

    if(isAuth){
        return <Navigate to='/' />
    }
   

    return ( <div>
        <Navbar/>
                <div className='form_container'>
                    <h1>LOG IN</h1>
                  <form onSubmit={handlesubmit} action="">
                        <label htmlFor="">Username</label>
                        <MDBInput label='Username'  type='text' name='username' value={ loginuser.username } onChange={handleChange} />
                        <label htmlFor="">Password</label>
                        <MDBInput label='Password'  type='text' name='password'  value={ loginuser.password } onChange={handleChange} />
                         <button>login</button><br />
                         <button> <Link style={{ textDecoration: 'none', color: 'white' }} to='/signup' >create account</Link></button>
                </form>
                </div>
       <Footer/>
    </div> );
}

export default LoginPage;