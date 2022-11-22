import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Box } from '@chakra-ui/react'
import { BsTruck } from 'react-icons/bs';
function ProductDetails() {
    const {id}=useParams();
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        getData();
    },[])

    const getData=()=>{
        fetch(`http://localhost:3000/Best_Sellers/${id}`).then((res)=>res.json())
        .then((res)=>setData(res)).finally(()=>setLoading(false))
    }

    return (<>
    <Navbar/>
    <Box bg='tomato' w='100%' p={4} color='black' display='flex'>
      <Box><img src={data.image} alt="" /></Box>
      <Box>
        <p>{data.type}</p>
        <p>{data.title}</p>
        <p>{data.price}</p>
        {}
        <p>Shipping calculated at checkout</p>
            <Box>ADD TO CART</Box>
            <p> <BsTruck/> Free US Shipping on $199+ Orders</p>
            <p>30-Days Returns / Exchanges</p>
            <p>Worth Holding Onto</p>
      </Box>
    </Box>
    <Footer/>
    </>);
}

export default ProductDetails;