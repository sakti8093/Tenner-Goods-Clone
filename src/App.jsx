import logo from './logo.svg';
import './App.css';
import Navbar from './Pages/Navbar';
import Home from './Pages/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Pages/Footer';
import Allroutes from './Allroutes';
import { Box, Icon, Image, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { search } from './api';


function App() {

  const [showSearch,setShow]=useState(false);
  const [searchArray,setSearch]=useState([])

  const handleCross=()=>{
    setShow(false)
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
    {showSearch?<Box width='80%' display='flex' top='120' overflow='hidden' p={2}  zIndex='999' margin='auto' height='60px' ><Input  onChange={handleSearch} width='40%' margin='auto' placeholder='search here.....' /><Icon w={8} h={8} as={AiOutlineCloseCircle} onClick={handleCross} /> </Box>:""}
    {showSearch?<Box width='60%' margin='auto' >{searchArray.map((elem)=>{
      return  <Box display='flex'  width='100%' p={2} border='1px solid black'>
          <Image  width='80px' height='80px'  src={elem.image}  /> 
          <Text>{elem.title}</Text>
         </Box>
    })}</Box>:""}
    <Allroutes /> 
    <Footer/>
         </div> 
)
  ;
}

export default App;
