import { Container,Box,Icon,Text,  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,Input,
  DrawerContent,Button,useDisclosure,
  DrawerCloseButton, } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { BsBag } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';

import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/ContextProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';



function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef();
 const {isAuth,HandleLogin,setoken,setUsername}=useContext(AuthContext)
  const [userData,setData]=useState({});

  const token= localStorage.getItem("token");
  const username=localStorage.getItem("username");


  useEffect(()=>{
    getUser(token);
  },[token])

  
  const getUser=async(token)=>{
      try{
        const userdetail=await fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`,{
          method:"GET",
          headers:{
            "Authorization" : `Bearer ${token} `
          }
      })
      const res2=await userdetail.json();
      console.log(res2);
      setData(res2)
      }catch(err){
        localStorage.clear();
        alert("Please Refresh and Login");
      }
     
  }

  console.log(userData);

//  if(token){
    return (<>
     <Box bg='white' w='100%'   p={10} color='black' borderRadius='lg' display='flex' borderWidth='1px' justifyContent='space-between' position='fixed' top='0' overflow='hidden' zIndex='9999' >
    <NavLink to='/' > <Box ><img  src="/logo-1.png" alt="" /></Box></NavLink>  
    <Box as='button' bg='white'  display={{base:'block', sm:'block', md:'none', lg:'none' }} onClick={isOpen? onClose : onOpen } >
        <Icon as={GiHamburgerMenu  } w={14} h={14}  />
      </Box>
     <Box  display={{base:'none', sm:'none', md:'flex', lg:'flex' }}  alignItems='center' gap='1rem' > 
     <Link style={{ textDecoration: 'none', color: 'black' }} to='/products'><Text fontSize={{ base: '10px', md: '15px', lg: '20px' }} > Fake Store </Text> </Link> 
     <Link style={{ textDecoration: 'none', color: 'black' }} to='/mazma'> <Text fontSize={{ base: '10px', md: '15px', lg: '20px' }} > Mazma Wires </Text> </Link> 
    <Text fontSize={{ base: '10px', md: '15px', lg: '20px' }} > Featured Collections</Text>
    <Text fontSize={{ base: '10px', md: '15px', lg: '20px' }} > Final Sales</Text> </Box>
   <Box display={{base:'none', sm:'none', md:'flex', lg:'flex' }} alignItems='center' gap='1rem' > 
   <Link style={{ textDecoration: 'none', color: 'black' }} to={ token ? '/user' : '/login' } ><Text fontSize={{ base: '10px', md: '15px', lg: '20px' }} >{token? userData.name : <Icon as={BiUser} w={6} h={6}  />} </Text></Link >
    <Link style={{ textDecoration: 'none', color: 'black' }} to='/user/cart' > <Icon as={BsBag} w={6} h={6} />  </Link>
      <SearchIcon color='black' w={6} h={6} /></Box>
</Box>
<Drawer onClose={onClose} isOpen={isOpen} size='lg' >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader marginTop='140px' borderBottomWidth='1px' >
            <Link onClick={isOpen? onClose : onOpen } style={{ textDecoration: 'none', color: 'black' }} to={ token ? '/user' : '/login' }><Text  >{token? userData.name : <Icon as={BiUser} w={16} h={16}  />  } </Text> 
             </Link ></DrawerHeader>
          <DrawerHeader borderBottomWidth='1px'><Box display="flex" alignItems='center' gap='1rem' > 
    <Link onClick={isOpen? onClose : onOpen } style={{ textDecoration: 'none', color: 'black' }} to='/user/cart' > <Icon as={BsBag} w={16} h={16} />  </Link>
      <SearchIcon color='black' w={16} h={16} /></Box>
      </DrawerHeader>
          <DrawerBody >
          <Box marginTop='50px' width='100%' alignItems='center' gap='1rem'p={8} > 
     <Link  onClick={isOpen? onClose : onOpen } style={{ textDecoration: 'none', color: 'black' }} to='/products'>
      <Text fontSize='30px'  > Fake Store </Text> </Link> 
     <Link  onClick={isOpen? onClose : onOpen } style={{ textDecoration: 'none' , color: 'black' }} to='/mazma'> <Text fontSize='30px' _hover={{ bg:"red" }} > Mazma Wires </Text> </Link> 
    <Text  fontSize='30px' > Featured Collections</Text>
    <Text fontSize='30px' > Final Sales</Text> </Box>
          </DrawerBody>
          <DrawerFooter>Made with 💝 by sakti  </DrawerFooter>
        </DrawerContent>
      
      </Drawer>
    </>
   );
   
 // }
  //   return ( <Box bg='white' w='100%' p={10} color='black' borderRadius='lg' display='flex' borderWidth='1px' justifyContent='space-between' position='fixed' top='0' overflow='hidden' zIndex='9999' >
  //     <NavLink to='/' > <Box><img src="/logo-1.png" alt="" /></Box></NavLink>  
  //   <Box display='flex' alignItems='center' gap='1rem' > <Link style={{ textDecoration: 'none', color: 'black' }} to='/products'> <Text fontSize={{ base: '10px', md: '15px', lg: '20px' }} > Tanner Goods </Text></Link> 
  //   <Link style={{ textDecoration: 'none', color: 'black' }} to='/mazma'><Text fontSize={{ base: '10px', md: '15px', lg: '20px' }} > Mazma Wires </Text> </Link> 
  //    <p>FeaturedCollections</p> <p>Final Sales</p> </Box>
  //   <Box display='flex' alignItems='center' gap='1rem' > <Link style={{ textDecoration: 'none', color: 'black' }} to='/login' > <Icon as={BiUser} w={6} h={6} /> </Link>  <Link style={{ textDecoration: 'none', color: 'black' }} to='/user/cart' > <Icon as={BsBag} w={6} h={6} />  </Link> <SearchIcon color='black' w={6} h={6} />  </Box>
  // </Box>
  //    );
}
export default Navbar;

