import { productModel } from "../Models/productmodel.js"

export const mazma= async(req,res)=>{
    try{
        let query = req.query
        if(Object.keys(query).length!=0){
            if(query.sort=="lth"){
                var data=await productModel.find({type:"MAZAMA COLLECTION"}).sort({price:1})
                }else{
                var data=await productModel.find({type:"MAZAMA COLLECTION"}).sort({price:-1})
                }
            }else{
            var data=await productModel.find({type:"MAZAMA COLLECTION"})
           }
        res.send(data)
    }catch(err){
        res.status(500).send({
            message: err
        })
    }
}

export const tennergoods= async(req,res)=>{
    try{
        let data=await productModel.find({type:"TANNER-GOODS"})
        res.send(data)
    }catch(err){
        res.status(500).send({
            message: err
        })
    }
}

export const getProductDetails= async(req,res)=>{
    try{
        let {id}=req.params;
        console.log(id)
        let data=await productModel.findOne({_id:id})
        res.send(data);
    }catch(err){
        res.status(500).send("something went wrong")
    }
}