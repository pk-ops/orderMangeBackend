import express from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {createUser,
        loginUser,
} from './helper.js';

const router=express.Router();

router.post('/register',async function(req,res){
    // const data=req.body;
    // console.log(data);
    const {name,email,password,role}=req.body;

        const encryptedPassword=await bcrypt.hash(password,10);
    
        try {
            // const oldUser=await createUser(email)
            // if(oldUser){
            //     res.send("User exit")
            // }
           const result= await createUser({
                name,
                email,
                password:encryptedPassword,
                role,
            });
            res.send(result);
            console.log(result)
            
        } catch (error) {
            res.send({status:"error"})
        }
   
    
})


router.post("/login",async function(req,res){
        const {email,password}=req.body;
        console.log(email,password);
        const user=await loginUser(email)
      
                if(!user){
                return  res.json({error:"User Not Found"});
              }
              if(user.role=="User"){
                return res.json({status:"ok",role:user.role})
              }
              if(await bcrypt.compare(password,userpass.password)){
                const token=jwt.sign({},JWT_SECRET);
                
        
                if(res.status(201)){
                    return res.json({status:"ok",data:token});
                }
                else{
                    return res.json({error:"error"})
                }
              }
              res.json({status:"error",error:"Invalid Password"})
})
export const usersRouter=router;