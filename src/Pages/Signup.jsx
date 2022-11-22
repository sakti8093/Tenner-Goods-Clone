import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Box, useToast } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom';


const InitState={
    name:"",
    email:"",
    password:"",
    username:"",
    mobile:"",
    description:""
}
function SignupPage() {
    const toast = useToast()

   const [userData,setUser]=useState(InitState);
   const [reg,setReg]=useState(false);

   const handleChange=(e)=>{
        const {name,value}=e.target;
        setUser({...userData,[name]:value})
   }

   if(reg){
    return  <Navigate to='/login' />
   }


   const handleSubmit=async(e)=>{
         e.preventDefault();
        let registerRes = await fetch(`https://masai-api-mocker.herokuapp.com/auth/register`,{
            method: 'POST',
            body: JSON.stringify(userData),
            headers : {
                'content-type': 'application/json'
            }
        });

        let res = await registerRes.json();
        console.log(res);
        if(res.error){   
            setReg(false);
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
            setReg(true);
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                position: 'bottom',
                duration: 4000,
                isClosable: true,
              });
            let res1=  await fetch("https://tinder-goods-rwact-sakti.herokuapp.com/users",{
            method: 'POST',
            body: JSON.stringify(userData),
            headers : {
                'content-type': 'application/json'
            }
         });
        }
   }

    return ( <Box marginBottom='30px'>
       <Box  w={{ base:'100%' ,sm:'100%' ,md:'50%',lg:'40%'  }} p='6' className='form_container'>
        <h1>Sign Up</h1>
       <form onSubmit={handleSubmit} action="">
           <label htmlFor="">FIRST NAME</label>
          <MDBInput label='First Name'  type="text" name="name" value={userData.name} onChange={handleChange} />
          {/* <label htmlFor="">LAST NAME</label>
          <MDBInput label="Last Name"  type="text" name="lastname" value={userData.lastname} onChange={handleChange} /> */}
          <label htmlFor="">USER NAME</label>
          <MDBInput label="User Name"  type="text" name="username" value={userData.username} onChange={handleChange} />
          <label htmlFor="">EMAIL</label>
          <MDBInput label="Email" type="text" name="email" value={userData.email} onChange={handleChange}  />
          <label htmlFor="">PASSWORD</label>
          <MDBInput label="Password" type="text" name="password" value={userData.password} onChange={handleChange} />
          <label htmlFor="">Mobile</label>
          <MDBInput label="Mobile" type="text" name="mobile" value={userData.mobile} onChange={handleChange} />
          <label htmlFor="">Description</label>
          <MDBInput label="Description" type="text" name="description" value={userData.description} onChange={handleChange} />
          <button>Create</button>
        </form>
       </Box>
    </Box> );
}

export default SignupPage;