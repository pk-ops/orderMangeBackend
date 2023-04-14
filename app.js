import express from 'express';
import { MongoClient } from 'mongodb';
import {adminRouter} from './routes/admin.js'
import cors from "cors";

import dotenv from "dotenv";
import { usersRouter } from './routes/users.js';




const app=express();
app.use(express.json())

app.use(cors());

dotenv.config();

const PORT=process.env.PORT;
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



app.listen(PORT,()=>console.log(`APP started ${PORT}`));







 