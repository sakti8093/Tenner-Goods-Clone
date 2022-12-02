import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit'
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast,Button,ButtonGroup,isLoading,Box } from '@chakra-ui/react'
import { useContext } from 'react';
import { AuthContext } from '../Context/ContextProvider';
import BeatLoader from "react-spinners/BeatLoader";
import { loginapi } from '../api';
import Cookies from 'js-cookie'



function LoginPage() {

    const [loginuser,setLoginUser]=useState({email:"",password:""});
    const toast = useToast();
   const [loading,setLoad]=useState(false);
    const {isAuth,setAuth}=useContext(AuthContext)

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setLoginUser({...loginuser,[name]:value});
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        setLoad(true);
       try{
        console.log(loginuser)
        let registerRes = await fetch(loginapi,{
            method: 'POST',
            body: JSON.stringify(loginuser),
            headers : {
                'content-type': 'application/json'
            }
        });
        let res = await registerRes.json();
      setLoad(false)
        if(!res.success){   
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
                description: `welcome back `,
                status: 'success',
                position: 'bottom',
                duration: 4000,
                isClosable: true,
              });
          console.log(res);
          Cookies.set("token",res.message)
          Cookies.set("isAuth",true);
          setAuth(true);
        }
       }catch(err){
        alert("some thing went wrong !! try Again after some time")
       }
    }

    if(isAuth){
        return <Navigate to='/' />
    }
   

    return ( <Box marginBottom='50px' >
                <Box w={{ base:'100%' ,sm:'100%' ,md:'50%',lg:'40%'  }} p='6' className='form_container'>
                    
                    <h1>LOG IN</h1>
                  <form onSubmit={handlesubmit} action="">
                        <label htmlFor="">Email</label>
                        <MDBInput label='Enail'  type='text' name='email' value={ loginuser.email } onChange={handleChange} />
                        <label htmlFor="">Password</label>
                        <MDBInput label='Password'  type='text' name='password'  value={ loginuser.password } onChange={handleChange} />
                         <button disabled={loading} >login</button><br />
                         <button > <Link style={{ textDecoration: 'none', color: 'white' }} to='/signup' >create account</Link></button>
                </form>
                </Box>
    </Box> );
}

export default LoginPage;

{/* <Button
  isLoading
  colorScheme='blue'
  spinner={<BeatLoader size={8} color='white' />}
>
  Click me
</Button> */}