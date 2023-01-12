import { cartModel } from "../Models/cartmodel.js";

export const getCart=async(req,res)=>{
    let {userid}=req.params;
    try{
        if(userid){
            const userCart=await cartModel.find({userid:userid})
            if(userCart.length>0){
                res.send({
                    success: true,
                    message:userCart
                })
            }else{
                res.status(404).send({
                    success: false,
                    message:"user not found"
                })
            }
        }else{
            res.status(400).send({success:false,message:"invalid userid"})
        }
    }catch(err){
        res.status(500).send({success:false,message:"something went wrong"});
    }
}


export const addCart=async(req,res)=>{
    try{
        let cart=req.body;
        cart={...cart,quantity:1}
        if(cart.userid){
               let usercart=await cartModel.find({_id:cart._id,userid:cart.userid});    
                if(usercart.length>0){
                    res.status(400).send({
                        success: false,
                        message:"Already Present in cart"
                    })
                }else{
                    await cartModel.create(cart)
                res.send({
                    success: true,
                    message:"Added to cart"
                })
                }
        }else{
            res.status(400).send({
                success: false,
                message:"Provid a valid userd"
            })
        }
    }catch(err){
        res.status(500).send({success:false,message:"something went wrong"});
    }
}

export const updateCart= async(req,res)=>{
    try{
        let {id}=req.params;
       
        if(id){
            let {quantity}=req.body;
            if(quantity){
                await cartModel.findByIdAndUpdate(id,{quantity:quantity})
                res.send({
                    sucess:true
                })
            }else{
                res.send({
                    sucess:false,
                    message:"quantity is required"
                })
            }
        }else{
            res.send({
                sucess:false,
                message:"Enter valid userid"
            })
        }

    }catch(err){
        res.status(500).send({success:false,message:"something went wrong"});
    }
}

export const delCart= async(req,res)=>{
    let {id}=req.params;
    try{
        let res=await cartModel.findOneAndRemove({_id:id});
        if(res){
            res.send({
                sucess:true,
                message:"Removed From cart"
            })
        }else{
            res.send({
                sucess:false,
                message:"Not Found"
            })
        }
    }catch(err){
        res.send({
            sucess:false,
            message:"Internal Server Error"
        })
    }
}