import { useEffect, useState } from "react";
import { Flex,Center,Square, Text, Spacer, Heading,Button, Icon } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { BsTruck } from 'react-icons/bs';
import Collapsible from 'react-collapsible';
import { useContext } from "react";
import { AuthContext } from "../Context/ContextProvider";
import { Navigate } from "react-router-dom";
import { Cart } from "../api";
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai'

function CratPage() {

    const [data,setData]=useState([]);
    const [total,setTotal]=useState(0);
    const { user,del,handleDeleteCart,getToken}=useContext(AuthContext);
    const [checkClick,setCheckClick]=useState(false);
   
    useEffect(()=>{
        getData();
       
    },[del,total]);


    if(checkClick){
        return <Navigate to='/user/cart/checkout' />
    }

    const getData=async()=>{
        let userr=getToken();
        let id=userr._id
        let res1=await fetch(`${Cart}/${id}`)
        let res2=await res1.json();
        console.log(res2)
        setData(res2.message);
        getTotal(res2.message);
    }

    
    const getTotal=(data)=>{
        let price= data.reduce((acc,elem)=>{
            return acc+elem.price*elem.quantity;
        },0)
        setTotal(price)
    }

    const HandleClickCheckout=()=>{
        setCheckClick(true);
    }

    const handleIncrease=async(id,quantity)=>{
        console.log(Cart,"cart")
         await fetch(`${Cart}/${id}`,{
           method:"PATCH", 
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({"quantity":quantity+1})
        })
        getData();
    }
    const handleDecrease=async(id,quantity)=>{
        if(quantity==1){
            return
        }
      await  fetch(`${Cart}/${id}`,{
          method:"PATCH",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({"quantity":quantity-1})
       })
       getData();
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
                     <p>Rs.{elem.price}</p> 
                     <p>Shipping calculated at checkout</p>
           <Box> <Icon  onClick={()=>handleDecrease(elem._id,elem.quantity)} as={AiOutlineMinusCircle}/> {elem.quantity} <Icon onClick={()=>handleIncrease(elem._id,elem.quantity)} as={AiOutlinePlusCircle} /> </Box>
           <Box as="button" onClick={()=>handleDeleteCart(elem._id)} bg='black' >Remove From cart</Box>
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