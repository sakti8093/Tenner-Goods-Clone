import { productModel } from "../Models/productmodel.js"

export const search=async(req,res)=>{
    let {title}=req.body
    let data=await productModel.find({ title:{$regex:title,$options:"$i" }})
    res.send(data)
}