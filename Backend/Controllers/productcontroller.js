import { productModel } from "../Models/productmodel.js"

export const mazma= async(req,res)=>{
    try{
        let data=await productModel.find({type:"MAZAMA COLLECTION"})
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