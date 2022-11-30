import userModel from "../Models/usermodel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv'

env.config();

const jwt_secret = process.env.JWT_SECRET;

export const register = async(req,res)=>{
    try{
        let {email,password,name} = req.body;
        if(email && password){
            let usersData=await userModel.find({email:email})
            if(usersData.length > 0){
                res.status(400).send({
                    success: false,
                    message: "email already exists"
                })
            }else{
               let hashpwd= bcrypt.hashSync(password,10);
               await userModel.create({name:name,email:email,password:hashpwd})
                res.status(200).send({
                    success: true,
                    message: "register success"
                })
        }
    }else{
        res.status(400).send({
            success: false,
            message: "email and password are required"
        })
     }
    }catch(err){
        res.status(500).send({
                success :false,
                message:err
        })
    }
}

export const login = async(req,res)=>{
    try{
        let {email,password} = req.body;
        if(email && password){
            let usersData=await userModel.findOne({email:email})
        
            let hashedPwd=usersData.password;
            if(bcrypt.compareSync(password,hashedPwd)){
              
                delete usersData.password;
                const token= jwt.sign({usersData},jwt_secret)
                res.status(200).send({
                    success: true,
                    message: token
                })
            }else{
                res.status(400).send({
                    success: false,
                    message: "email or password is incorrect"
                })
            }
        }else{
            res.status(400).send({
                success: false,
                message: "email and password are required"
                        })
                    }
        }catch(err){
            res.status(500).send({
                success :false,
                message:err
             })

    }
}