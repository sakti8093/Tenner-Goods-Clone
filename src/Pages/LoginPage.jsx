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



function LoginPage() {

    const [loginuser,setLoginUser]=useState({username:"",password:""});
    const toast = useToast();
   const [loading,setLoad]=useState(false);
    const {isAuth,HandleLogin,setoken,setUsername}=useContext(AuthContext)

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setLoginUser({...loginuser,[name]:value});
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        setLoad(true);
       try{
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
      setLoad(false)
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
              localStorage.setItem("token",res.token);
           localStorage.setItem("username",loginuser.username)  
              HandleLogin(loginuser.username);
              setUsername(loginuser.username)
           setoken(res.token); 
        }
       }catch(err){
        localStorage.clear();
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
                        <label htmlFor="">Username</label>
                        <MDBInput label='Username'  type='text' name='username' value={ loginuser.username } onChange={handleChange} />
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