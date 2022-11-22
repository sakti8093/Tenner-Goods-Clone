import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Flex,Center,Square, Text, Spacer, Heading,Button } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { BsTruck } from 'react-icons/bs';
import Collapsible from 'react-collapsible';
import { useContext } from "react";
import { AuthContext } from "../Context/ContextProvider";
import { Navigate } from "react-router-dom";

function CratPage() {

    const userID=localStorage.getItem("TGID");
    const [data,setData]=useState([]);
    const [total,setTotal]=useState(0);
    const {del,handleDeleteCart}=useContext(AuthContext);
    const [checkClick,setCheckClick]=useState(false);
   
    useEffect(()=>{
        getData();
    },[del,total]);

    console.log(del)

    if(checkClick){
        return <Navigate to='/user/cart/checkout' />
    }

    const getData=async()=>{
        let res1=await fetch(`https://tinder-goods-rwact-sakti.herokuapp.com/users/${userID}/cart`)
        let res2=await res1.json();
        setData(res2);
        getTotal(res2);
    }

    
    const getTotal=(data)=>{
        let price= data.reduce((acc,elem)=>{
            return acc+elem.price;
        },0)
        setTotal(price)
    }

    const HandleClickCheckout=()=>{
        setCheckClick(true);
    }

    return (
        <>

        <Box w='100%' color='white'>
       <Box w='100%' position='fixed' height='60px'  className="btn-grad" marginTop='-10px' display='flex' justifyContent='space-between' > <Heading fontSize='25px' color='black' > Total Price: {total} </Heading>
        <Button variant='solid' bg={{ base:"orange.500" ,sm:'orange.500',md:"black" , lg:"black" }}  pos={{ base:'fixed',sm:'fixed', md: 'static', lg:'static' }} 
         bottom='-3' width={{base:'100%' , sm:"100%" , md:'150px' }} left='0' height={{ base:'70px',sm:'70px', md: '50px', lg:'50px' }} 
          colorScheme='black' onClick={HandleClickCheckout}> <Text textAlign='center' fontSize={{ base:"20px" , sm:'20px'   }} > CHECKOUT </Text> </Button> </Box>
        {data.map((elem)=>(
         <Box display={{ base:'block',sm:'block', md: 'flex', lg:'flex' }} gap='20px' justifyContent='space-evenly' p={4} > 
            <Box w={{ base:'100%',sm:'100%', md: '60%', lg:'60%' }}  > <img src={elem.image} alt="" /> </Box>
            <Box w={{ base:'100%',sm:'100%', md: '60%', lg:'40%' }}  className="producDetailsSecChild" color='black' ><p>{elem.type}</p>
                    <p>{elem.title}</p>
                     <p>${elem.price}</p> 
                     <p>Shipping calculated at checkout</p>
           <Box as="button" onClick={()=>handleDeleteCart(elem.id)} bg='black' >Remove From cart</Box>
            <Box display='flex' p={2} alignItems="center" gap={2} > <BsTruck size={30} /> Free US Shipping on $199+ Orders</Box>
            <p>30-Days Returns / Exchanges</p>
            <p>Worth Holding Onto</p>
            <Collapsible className="collapsbelButton" trigger="Product Description">
                <p>{elem.desc}</p>
             </Collapsible>
            </Box>
         </Box>
        ))}
        </Box>
        </>
      );
}

export default CratPage;