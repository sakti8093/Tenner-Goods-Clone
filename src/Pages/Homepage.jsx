
import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer';
import Navbar from './Navbar';
import {Box,Grid,GridItem,Stack,Skeleton, Img, TagRightIcon} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tenner } from '../api';


function Home() {
  const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }
  let products="Best_Sellers";

  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    
    getData();
  },[])

  const getData=()=>{
    fetch(tenner).then((res)=>res.json()).then((res)=>setData(res)).then((res)=>setLoading(false))
  }

  console.log(data);

    return ( <>
          <Box  backgroundColor='#c69c6d' textAlign='center'  p={2}  color='white' > <p>FREE US SHIPPING $199+ | EASY RETURNS | FREE EXCHANGES</p> </Box>
        <Carousel controls={true}  >
        <Carousel.Item>
          <Img height={{ base:'250px' , sm:"250px" , md:"300px" , lg:"400px"   }} 
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0044/9802/collections/Tanner-Goods-Leather-Wallet-Portland-Hero_2400x.jpg?v=1647381821"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Img   height={{ base:'250px' , sm:"250px" , md:"300px" , lg:"400px"   }} 
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0044/9802/files/TG-Utility-Bifold-Saddle-Tan-Hero_300x.jpg?v=1663373530"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Img   height={{ base:'250px' , sm:"250px" , md:"300px" , lg:"400px"   }} 
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0044/9802/collections/Tanner-Goods-M81-Lifestyle-Hero-01_2400x.jpg?v=1659673103"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
       
       <div className='best_sel_title'>
        <p>Explore Best Sellers</p>
       </div>

      {loading?<Stack><Skeleton height='20px' /><Skeleton height='20px' /><Skeleton height='20px' /></Stack> :
      <Grid className='best_sel'  templateColumns= {{ base:'repeat(1, 1fr)',sm:'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg:  'repeat(4, 1fr)' }} >
        {
          data.map((elem)=>( <Link  data-aos="flip-down" style={{textDecoration:"none", color:"black" }} to={`/products/${elem._id}`} className='best_sel_card' > 
          <img src={elem.image} alt="" /> 
          <p>{elem.title}</p>
          <p>{elem.type}</p>
          <p>{elem.price}</p>
           </Link> ))
        }
      </Grid>
        }
      </>
      );
}

export default Home;