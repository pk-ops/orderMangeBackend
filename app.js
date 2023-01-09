import express from 'express';
import { MongoClient } from 'mongodb';
import {adminRouter} from './routes/admin.js'
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { usersRouter } from './routes/users.js';


const  JWT_SECRET="fuiewbuifweigbwbjcnmsdnsckxzasdsadsad1w12221213243576764@2432456cdfsfghtgfadasSS"

const app=express();
app.use(express.json())

app.use(cors());

dotenv.config();


const MONGO_URL=process.env.MONGO_URL;
// const PORT=process.env.PORT;

async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is Connected")
    return client;
}
export const client= await createConnection();


app.use("/admin",adminRouter);
app.use("/users",usersRouter)


app.listen(5000,()=>console.log(`APP started`));


// const mongoUrl="mongodb+srv://prathamesh:VVKSDrjpLOCcX0rQ@cluster0.ruj5mbe.mongodb.net/?retryWrites=true&w=majority";
// mongoose
// .connect(mongoUrl,{
//     useNewUrlParser:true,
// }).then(()=>{console.log("Connected to database")
// }).catch((e)=>console.log(e));

// app.listen(5000,()=>{
//     console.log("Server Started");
// })

// app.post("/post",async(req,res)=>{
//     console.log(req.body);
//     const {data}=req.body;
//     try {
        
//         if(data=="prathamesh"){
//             res.send({status:"ok"})
//         }else{
//             res.send({status:"User not found"})
//         }
//     } catch (error) {
//         res.send({status:"error"})
//     }
 
// });

// require('./userDetails');
// require('./AdminDashboard');
// require('./CategoryDetails')

// const User=mongoose.model("UserInfo");
// const CategoryAdd=mongoose.model("Category");

// app.post("/category",async(req,res)=>{
//     const {name,slug,descript,status,meta_title,meta_keyword,meta_description}=req.body;
    
//     try{

//     await CategoryAdd.create({
//         name,
//         slug,
//         descript,
//         status,
//         meta_title,
//         meta_keyword,
//         meta_description,
//     })
//     res.send({status:"ok"})
// }catch(error){
//       res.send({status:"error"})
// }
// })

// app.get("/view-category",async(req,res)=>{
//     const viewCategory=await CategoryAdd.find(req.query);
//    return res.send({data:viewCategory,status:"ok"});

// })

// app.post("/register",async(req,res)=>{
//     const {name,email,password,role}=req.body;

//     const encryptedPassword=await bcrypt.hash(password,10);

//     try {
//         const oldUser=await User.findOne({email});
//         if(oldUser){
//           return  res.send({error:"User Exists"});
//         }
//         await User.create({
//             name,
//             email,
//             password:encryptedPassword,
//             role,
//         });
//         res.send({status:"ok"})
        
//     } catch (error) {
//         res.send({status:"error"})
//     }
// })

// app.post("/login-user",async(req,res)=>{
//     const {email,password}=req.body;
//     const user = await User.findOne({email});

//     if(!user){
//         return  res.json({error:"User Not Found"});
//       }
//       if(user.role=="User"){
//         return res.json({status:"ok",role:user.role})
//       }
//       if(await bcrypt.compare(password,user.password)){
//         const token=jwt.sign({},JWT_SECRET);
        

//         if(res.status(201)){
//             return res.json({status:"ok",data:token});
//         }
//         else{
//             return res.json({error:"error"})
//         }
//       }
//       res.json({status:"error",error:"Invalid Password"})
// })

// app.post("/login-admin",async(req,res)=>{
//     const {email,password}=req.body;
//     const user = await User.findOne({email});
    
//     if(!user){
//         return  res.json({error:"User Not Found"});
//       }
     
//       if(user.role=="Admin"){
//         return res.json({status:"ok",role:user.role})
//       }
//       if(await bcrypt.compare(password,user.password)){
//         const token=jwt.sign({},JWT_SECRET);
       
//         if(res.status(201)){
//             return res.json({status:"ok",data:token});
//         }
//         else{
//             return res.json({error:"error"})
//         }
//       }
//       res.json({status:"error",error:"Invalid Password"})
// })







 