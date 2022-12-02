
import { useId, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Box, Button, Img } from '@chakra-ui/react'
import { BsTruck } from 'react-icons/bs';
import Collapsible from 'react-collapsible';
import { useToast } from '@chakra-ui/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { Cart } from "../api";
import { useContext } from "react";
import { AuthContext } from "../Context/ContextProvider";


function ProductDetails() {
    const {id}=useParams();
    const {products}=useParams();
    const [data,setData]=useState([]);
    const [sizes,setSizes]=useState([]);
    const [loading,setLoading]=useState(true)
    const {user}=useContext(AuthContext);

    const toast = useToast();
    useEffect(()=>{
        getData();
    },[])

    const getData=()=>{
        fetch(`https://tinder-goods-rwact-sakti.herokuapp.com/${products}/${id}`).then((res)=>res.json())
        .then((res)=>setData(res)).finally(()=>setLoading(false))
    }

    const handleCart=async()=>{
      const InitState={
        image: data.image,
        title: data.title,
        type: data.type,
        price: data.price,
        desc: data.desc,
        desc_image: data.desc_image,
        userid:user._id
      }


      let res1=await fetch(Cart,{
        method:'POST',
        body: JSON.stringify(InitState),
        headers:{
          'content-type': 'application/json'
        }
      });
      if(res1.success) {
      toast({
        title: 'Sucessfully Added to cart',
        description: 'Product is ready for checkout',
        status: 'success',
        position: 'bottom',
        duration: 4000,
        isClosable: true,
      });
    }else{
      toast({
        title: 'Sucessfully Added to cart',
        description: `&{res.message}`,
        status: 'success',
        position: 'bottom',
        duration: 4000,
        isClosable: true,
      });
    }
    }


    return (<>
    <Box className="producDetailsMain" w='100%' p={{ base:'2',sm:'2', md: '6', lg:'12'}} gap='10' color='black' display={{ base:'block',sm:'block', md: 'flex', lg:'flex' }} justifyContent='space-between'  >
      <Box width={{ base:'100%',sm:'100%', md: '60%', lg:'60%' }}  ><img src={data.image} alt="" /></Box>
      <Box width={{ base:'100%',sm:'100%', md: '30%', lg:'60%' }}  className="producDetailsSecChild" >
        <p>{data.type}</p>
        <p>{data.title}</p>
        <p>${data.price}</p>
        <p>Shipping calculated at checkout</p>
           <Box as="button" bg={{ base:"orange.500" ,sm:'orange.500',md:"black" , lg:"black" }} pos={{ base:'fixed',sm:'fixed', md: 'static', lg:'static' }} bottom='-3' left='0' height={{ base:'60px',sm:'60px', md: '50px', lg:'50px' }}  onClick={handleCart} > ADD TO CART</Box>
            <Box display='flex' p={2} alignItems="center" gap={2} > <BsTruck size={30} /> Free US Shipping on $199+ Orders</Box>
            <p>30-Days Returns / Exchanges</p>
            <p>Worth Holding Onto</p>
    {/* <Collapsible className="collapsbelButton" trigger="Returns And Echange">
     
    </Collapsible>
    <Collapsible trigger="Shipping Info">
   
    </Collapsible> */}
    <Accordion allowToggle>
  <AccordionItem  >
    <h2  >
      <AccordionButton  _hover={{ bg:'black' }} className='AccordButton'  >
        <Box flex='1' textAlign='left' >
          PRODUCT DESCRIPTION
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <p>
      Tanner Goods | Mazama gladly accepts returns for refund, exchange, or store credit on unused, qualifying items within 30 days of receiving your purchase. Monogrammed items, final sale, and sample sale goods will not be eligible for returns and exchanges.
      </p>
      <p>
      If you'd like to make a return, just head over to our Returns Center and have your order number or email address handy.
      </p>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton _hover={{ bg:'black' }} className='AccordButton' >
        <Box flex='1' textAlign='left'>
          SHIPPING DETAILS
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
        <p>
      For destinations in the contiguous United States we offer the following shipping options: <br />
      Standard Shipping / 3-5 business days / $7.50 flat rate <br />
 
      - Orders over $199 USD ship for free <br />
       - Orders ship in 1-2 business days <br />
      </p>
      <p>
      Orders shipping to Alaska, Hawaii, American Samoa, Guam, the Marshall Islands, Puerto Rico, and the US Virgin Islands:
      </p>
    </AccordionPanel>
  </AccordionItem>
</Accordion>
      </Box>
    </Box>
    <Box><Img height={{ base:'250px' , sm:"300px" , md:"400px" , lg:"500px"   }}  data-aos="fade-left"  src={data.desc_image} alt="" /></Box>
    </>);
}

export default ProductDetails;