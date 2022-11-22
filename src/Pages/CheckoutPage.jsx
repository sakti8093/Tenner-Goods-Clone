import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/ContextProvider";
import Footer from "./Footer";
import Navbar from "./Navbar";

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,InputGroup,Button,
    TableCaption,
    TableContainer,useToast,
    Box,Input,InputRightElement,
        FormControl,
        FormLabel,
        FormErrorMessage,
        FormHelperText,
        InputLeftAddon,
        Stack,

  } from '@chakra-ui/react'
import { useState } from "react";


function CheckoutPage() {

    const userID=localStorage.getItem("TGID");
    const toast = useToast();

    const [data,setData]=useState([]);
    const [total,setTotal]=useState(0);
    let count=1;

    useEffect(()=>{
        getData();
    },[]);

    const getData=async()=>{
        let res1=await fetch(`https://tinder-goods-rwact-sakti.herokuapp.com/users/${userID}/cart`)
        let res2=await res1.json();
        setData(res2);
        getTotal(res2)
    }

    const getTotal=(data)=>{
        let price= data.reduce((acc,elem)=>{
            return acc+elem.price;
        },0)
        setTotal(price)
    }

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const HandleBuy=()=>{
        toast({
            title: 'Thank You For Ordering',
            description: 'Product is ready for Dispatch',
            status: 'success',
            position: 'bottom',
            duration: 4000,
            isClosable: true,
          });
    }

    return ( 
    <>
    <Box display={{ base:'block',sm:'block', md: 'flex', lg:'flex' }} width='100%' p={4} justifyContent='space-between' >
        <Box w={{ base:'100%',sm:'100%', md: '60%', lg:'60%' }} >
        <TableContainer width='100%' >
  <Table variant='simple'  >
    <TableCaption></TableCaption>
    <Thead>
      <Tr>
        <Th>SL.NO</Th>
        <Th>TITLE</Th>
        <Th isNumeric> PRICE </Th>
      </Tr>
    </Thead>
    <Tbody>
        {data.map((elem)=>(
              <Tr>
              <Td>{count++}</Td>
              <Td>{elem.title}</Td>
              <Td isNumeric>{elem.price}</Td>
            </Tr>
        ))}
        <Tr>
            <Td>Total Price</Td>
            <Td></Td>
            <Td>{total}</Td>
        </Tr>
    </Tbody>
  </Table>
</TableContainer>
        </Box>
        <Box>
        <FormControl >
            <Stack spacing={3}>
                <FormLabel>Email address</FormLabel>
                <Input type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
              <InputGroup>
                <InputLeftAddon children='+234' />
                 <Input type='tel' placeholder='phone number' />
           </InputGroup>
           <InputGroup>
                <InputLeftAddon children='VISA' />
                 <Input type='number' maxLength='16' placeholder='Enter Card Number' />
           </InputGroup>
           <InputGroup size='md'>
      <Input pr='4.5rem'   type={show ? 'text' : 'password'}  placeholder='Enter CVV Number'/>
      <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
      </InputGroup>
                <button onClick={HandleBuy} className="btn-grad" >BUY NOW</button>
            </Stack>
        </FormControl>

        </Box>
    </Box>
    </> );
}

export default CheckoutPage;