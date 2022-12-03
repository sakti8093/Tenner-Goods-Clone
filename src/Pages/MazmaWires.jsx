import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer';
import Navbar from './Navbar';
import {Box,Grid,GridItem,Stack,Skeleton, Img, Select} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mazama } from '../api';



function Mazma() {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [sort,setSort]=useState("");
  
    useEffect(()=>{
      getData();
    },[sort])

    const getUrl=()=>{
      if(sort){
       return `${mazama}?sort=${sort}`
      }else{
        return mazama
      }
    }
  
    const getData=()=>{
      let url=getUrl();
      console.log(url);
      fetch(url).then((res)=>res.json()).then((res)=>setData(res)).then((res)=>setLoading(false))
    }

    const handleSort=(e)=>{
      setSort(e.target.value)
    }
    
   // console.log(data);
    
    return (
        <>
        <Box backgroundColor='#c69c6d' textAlign='center'  p={2}  color='white' > <p>FREE US SHIPPING $199+ | EASY RETURNS | FREE EXCHANGES</p> </Box>
        <Carousel fade>
        <Carousel.Item>
          <Img  height={{ base:'250px' , sm:"250px" , md:"300px" , lg:"400px"   }}
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0044/9802/collections/Mazama-Onyx-Slider_2400x.jpg?v=1650562638"
            alt="First slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Img  height={{ base:'250px' , sm:"250px" , md:"300px" , lg:"400px"   }} 
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0044/9802/files/TG-Utility-Bifold-Saddle-Tan-Hero_300x.jpg?v=1663373530"
            alt="Second slide"
          />
  
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Img  height={{ base:'250px' , sm:"250px" , md:"300px" , lg:"400px"   }} 
            className="d-block w-100"
            src="httpAs://cdn.shopify.com/s/files/1/0044/9802/collections/Tanner-Goods-M81-Lifestyle-Hero-01_2400x.jpg?v=1659673103"
            alt="Third slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
       
       <div className='best_sel_title'>
       </div>

      {loading?<Stack><Skeleton height='20px' /><Skeleton height='20px' /><Skeleton height='20px' /></Stack> :
      <>
      <Select width='20%' name='sort' onChange={handleSort} >
        <option value="">Sort By price</option>
        <option value="lth">Low to High</option>
        <option value="htl">High to Low</option>
        </Select>

      <Grid className='best_sel' templateColumns= {{ base:'repeat(1, 1fr)',sm:'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg:  'repeat(4, 1fr)' }} >
        
        {
          data.map((elem)=>( <Link style={{textDecoration:"none", color:"black" }} to={`/products/${elem._id}`} className='best_sel_card' > 
          <Img src={elem.image} alt="" /> 
          <p>{elem.title}</p>
          <p>{elem.type}</p>
          <p>Rs: {elem.price}</p>
           </Link> ))
        }
      </Grid>
      </>
        }
        </>
     );
}

export default Mazma;