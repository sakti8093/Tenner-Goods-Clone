import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Navbar';
import Home from './Pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Pages/Footer';
import Allroutes from './Allroutes';
import { Box, Collapse, Icon, Image, Input, ScaleFade, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { search } from './api';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function App() {
  const { isOpen, onToggle } = useDisclosure()
  const [showSearch,setShow]=useState(false);
  const [searchArray,setSearch]=useState(false)
  const loading=useSelector((state)=>state.loading)

  const handleCross=()=>{
    setShow(false);
    setSearch(false);
    onToggle(false)
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
    <Navbar setShow={onToggle} />
    <ScaleFade initialScale={0.1} in={isOpen}  ><Box width='60%' display='flex' position='fixed' zIndex='200' bg='white'  overflow='hidden' p={2} margin='auto' height='60px' left='20%' borderRadius='50px' ><Input  onChange={handleSearch} width='90%' margin='auto' placeholder='search here.....' /><Icon w={8} h={8} as={AiOutlineCloseCircle} onClick={handleCross} /> </Box></ScaleFade>
    {searchArray?<Box display='block'  width={{ base:"80%" , sm:"60%" , md:"40%" , lg:"40%" }}  bg='white' margin='auto' zIndex='200' maxHeight='300px' overflowY='scroll' mt='50px' position='fixed' left='30%' >{searchArray.map((elem)=>(
      <Link onClick={handleClick} to={`/products/${elem._id}`} >  <Box  width='100%'  display='flex' p={2}>
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
