import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Navbar';
import Home from './Pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Pages/Footer';
import Allroutes from './Allroutes';
import { Box, Icon, Image, Input, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { search } from './api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showSearch,setShow]=useState(false);
  const [searchArray,setSearch]=useState(false)
  const loading=useSelector((state)=>state.loading)

  const handleCross=()=>{
    setShow(false);
    setSearch(false);
  }

  const handleClick=()=>{
    setShow(false);
    setSearch(false)
  }

  

  const handleSearch=async(e)=>{
    let res1=await fetch(search,{
      headers:{
      "Content-Type": "application/json"
      },
      method:"POST",
      body:JSON.stringify({title:e.target.value})
    })
    let res2=await res1.json();
    console.log(res2)
    setSearch(res2);
  }

  return (
  <div className='App'>
    <Navbar setShow={setShow} />
    {showSearch?<Box width='80%' display='flex'  bg='white'  overflow='hidden' p={2} margin='auto' height='60px' ><Input  onChange={handleSearch} width='40%' margin='auto' placeholder='search here.....' /><Icon w={8} h={8} as={AiOutlineCloseCircle} onClick={handleCross} /> </Box>:""}
    {searchArray?<Box width='40%' position='absolute' bg='white' left='30%'  zIndex='200' height='300px' overflow='scroll' margin='auto' >{searchArray.map((elem)=>(
      <Link onClick={handleClick} to={`/products/${elem._id}`} >  <Box  width='100%'  display='flex' p={2} border='1px solid black'>
          <Box width='100px' ><Image width='100%' src={elem.image} /></Box>
          <Text >{elem.title}</Text>
         </Box></Link>
    ))}</Box>:""}
    {loading?<Spinner position='fixed' left={{ base:"20%" , sm:"30%" , md:"20%" ,lg:"50%" }} top='40%' display='block' width='200px' height='200px' margin='auto' color="red" />:""}
    <Allroutes  /> 
    <Footer/>
         </div> 
)
  ;
}

export default App;
