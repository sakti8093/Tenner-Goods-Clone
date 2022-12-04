import mongoose from 'mongoose';

const productSchema=mongoose.Schema({
    name:{type: 'string'},
    image:{type:String},
    title:{type:"string"},
    price:{type:Number},
    desc:{type:"string"},
    desc_image:{type:"string"},
    type:{type:"string"},
})

export const productModel = mongoose.model('products',productSchema);