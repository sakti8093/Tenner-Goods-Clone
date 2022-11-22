import { Button, Input ,useToast} from "@chakra-ui/react";
import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const InitState={
    image:"",
    title:"",
    type:"",
    price:"",
    desc:"",
    desc_image:""
}

function AdminPage() {

  const [formData,setFormData]=useState(InitState);
  const toast = useToast();

    const handleChange=(e)=>{
        let {value,name}=e.target;
        if(name==="price"){
            value=Number(value);
        }
        setFormData({...formData,[name]:value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
       try{
        let res1=await fetch(`https://localhost:3000/mazma`,{
            method:'POST',
            body: JSON.stringify(formData),
            headers:{
              'content-type': 'application/json'
            }
          });
          toast({
            title: 'sucess !!',
            description: 'Added to database',
            status: 'success',
            position: 'bottom',
            duration: 4000,
            isClosable: true,
          }); 
       }catch(err){
        toast({
            title: 'Something seems wrong try restarting Data Base',
            description: `${err}`,
            status: 'error',
            position: 'bottom',
            duration: 4000,
            isClosable: true,
          }); 
       }
       setFormData(InitState);
    }


    return ( <>
      <form onSubmit={handleSubmit} action="">
      <Input type="text" name="image" id="" placeholder="For Image"  onChange={handleChange} value={formData.image}/>
      <Input type="text" name="title" placeholder="title"onChange={handleChange} value={formData.title}/>
      <Input type="text" name="type" id="" placeholder="type" onChange={handleChange} value={formData.type}/>
      <Input type="number" name="price" placeholder="price" onChange={handleChange} value={formData.price}/>
      <Input type="text" name="desc" placeholder="Description"onChange={handleChange} value={formData.desc}/>
      <Input type="text" name="desc_image" id="" placeholder="Desc Image" onChange={handleChange} value={formData.desc_image}/>
      <button>Submit</button>
      </form>
    </> );
}

export default AdminPage;