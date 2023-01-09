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







 