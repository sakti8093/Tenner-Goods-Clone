import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        name:{type:"string"},
        email:{type:"string" ,required:"true" },
        password:{type:"string" ,required:"true" },
    },{
        timestamps:true,
        versionKey:false    
    }
  )

const userModel =mongoose.model("users",userSchema);
export default userModel