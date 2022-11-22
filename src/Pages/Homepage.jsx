
import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer';
import Navbar from './Navbar';
import {Box,Grid,GridItem,Stack,Skeleton} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {

  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    getData();
  },[])

  const getData=()=>{
    fetch("http://localhost:3000/Best_Sellers").then((res)=>res.json()).then((res)=>setData(res)).then((res)=>setLoading(false))
  }

  console.log(data);

    return ( <>
           <Navbar/>
          <Box backgroundColor='#c69c6d' textAlign='center'  p={2}  color='white' > <p>FREE US SHIPPING $199+ | EASY RETURNS | FREE EXCHANGES</p> </Box>
        <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0044/9802/collections/Tanner-Goods-Leather-Wallet-Portland-Hero_2400x.jpg?v=1647381821"
            alt="First slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0044/9802/files/TG-Utility-Bifold-Saddle-Tan-Hero_300x.jpg?v=1663373530"
            alt="Second slide"
          />
  
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0044/9802/collections/Tanner-Goods-M81-Lifestyle-Hero-01_2400x.jpg?v=1659673103"
            alt="Third slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
       
       <div className='best_sel_title'>
        <p>Explore Best Sellers</p>
       </div>

      {loading?<Stack><Skeleton height='20px' /><Skeleton height='20px' /><Skeleton height='20px' /></Stack> :
      <div className='best_sel' >
        {
          data.map((elem)=>( <Link style={{textDecoration:"none", color:"black" }} to={`/products/${elem.id}`} className='best_sel_card' > 
          <img src={elem.image} alt="" /> 
          <p>{elem.title}</p>
          <p>{elem.type}</p>
          <p>{elem.price}</p>
           </Link> ))
        }
      </div>
        }
      <Footer/>
      </>
      );
}

export default Home;