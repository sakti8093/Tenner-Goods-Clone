import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
    name:{type: 'string'},
    image:{type:'String'},
    title:{type:"string"},
    price:{type:'Number'},
    desc:{type:"string"},
    desc_image:{type:"string"},
    type:{type:"string"},
    userid:{type:'String'},
    quantity:{type:'Number'}
})

export const cartModel = mongoose.model("carts",cartSchema)