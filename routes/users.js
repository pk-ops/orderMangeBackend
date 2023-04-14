import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {createUser,
        deleteProductById,
        getUserByEmail,
        loginUser,
} from './helper.js';

const router=express.Router();

async function genHashedPassword(password){
    const No_of_ROUNDS=10;
    const salt= await bcrypt.genSalt(No_of_ROUNDS)
    const hashedPassword=await bcrypt.hash(password,salt);
    return hashedPassword
  }

router.post('/register',async function(req,res){
        const {name,email,password,role}=req.body;
        // console.log(data);
        const userFromDB = await getUserByEmail(email);
        // console.log(userFromDB);
        if(userFromDB){
          res.status(400).send({message:"username already exists"})
        }else if(password.length<8){
          res.status(400).send({message:"password must be greater than 8"})
        }
        else{
          const hashedPassword= await genHashedPassword(password);
          console.log(hashedPassword);
          const result= await createUser({
            name:name,
            email:email,
            password:hashedPassword,
            role:role
          })
          res.status(200).send(result)
        }
   
    
})


router.post("/login",async function(request,response){
    
             const {email,password}=request.body;

              const user=await loginUser(email)
              console.log(user)
            console.log(user.role)
              if(!user || user.role!="User"){
                response.status(401).send({message:"Invalid Credentials"})
                console.log("username not found")
              }
              else{
                const storedPassword=user.password;
                const isPasswordMatch= await bcrypt.compare(password,storedPassword);
                console.log(isPasswordMatch)
                if(isPasswordMatch){
          
                  const token=jwt.sign({id:user._id},process.env.SECRET_KEY)
                  response.status(200).send({message:"Successful login",token:token,id:user._id,name:user.name,role:user.role})
                }else{
                  response.status(401).send({message:"Invalid Credentials"})
                }
              }
})

router.post("/login-admin",async function(request,response){
    
    const {email,password}=request.body;

     const user=await loginUser(email)
     console.log(user)
 
     if(!user || !user.role=='Admin'){
       response.status(401).send({message:"Invalid Credentials"})
       console.log("username not found")
     }
     else{
       const storedPassword=user.password;
       const isPasswordMatch= await bcrypt.compare(password,storedPassword);
       console.log(isPasswordMatch)
       if(isPasswordMatch){
 
         const token=jwt.sign({id:user._id},process.env.SECRET_KEY)
         response.status(200).send({message:"Successful login",token:token,id:user._id,name:user.name,role:user.role})
       }else{
         response.status(401).send({message:"Invalid Credentials"})
       }
     }
})





export const usersRouter=router;