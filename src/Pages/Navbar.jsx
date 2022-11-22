import { Container,Box,Icon } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { BsBag } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/ContextProvider';
import { useState } from 'react';
import { useEffect } from 'react';



function Navbar() {

  const token=localStorage.getItem("token");
  const username=localStorage.getItem("username")
  const [userData,setData]=useState({});

  const getUser=async()=>{
    const userdetail=await fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`,{
        method:"GET",
        headers:{
          "Authorization" : `Bearer ${token} `
        }
    })
    const res2=await userdetail.json();
    setData(res2)
  }

  useEffect(()=>{
    getUser();
  },[])

  console.log(userData);

  const {isAuth}=useContext(AuthContext);
  if(token!=null){
    return ( <Box bg='white' w='100%' p={10} color='black' borderRadius='lg' display='flex' borderWidth='1px' justifyContent='space-between' position='fixed' top='0' overflow='hidden' zIndex='9999' >
    <NavLink to='/' > <Box><img src="/logo-1.png" alt="" /></Box></NavLink>  
     <Box display='flex' alignItems='center' gap='1rem' > <Link style={{ textDecoration: 'none', color: 'black' }} to='/products'> Tanner Goods</Link> <p>Mazma Wres</p> <p>FeaturedCollections</p> <p>Final Sales</p> </Box>
   <Box display='flex' alignItems='center' gap='1rem' > <Link style={{ textDecoration: 'none', color: 'black' }} to='/user'><p>{userData.name}</p>  </Link> <Icon as={BsBag} w={6} h={6} /> <SearchIcon color='black' w={6} h={6} /></Box>
</Box>
   );
    
  }

    return ( <Box bg='white' w='100%' p={10} color='black' borderRadius='lg' display='flex' borderWidth='1px' justifyContent='space-between' position='fixed' top='0' overflow='hidden' zIndex='9999' >
      <NavLink to='/' > <Box><img src="/logo-1.png" alt="" /></Box></NavLink>  
    <Box display='flex' alignItems='center' gap='1rem' > <Link style={{ textDecoration: 'none', color: 'black' }} to='/products'> Tanner Goods</Link> <p>Mazma Wres</p> <p>FeaturedCollections</p> <p>Final Sales</p> </Box>
    <Box display='flex' alignItems='center' gap='1rem' > <Link style={{ textDecoration: 'none', color: 'black' }} to='/login' > <Icon as={BiUser} w={6} h={6} /> </Link>  <Icon as={BsBag} w={6} h={6} /> <SearchIcon color='black' w={6} h={6} />  </Box>
  </Box>
     );
}

export default Navbar;