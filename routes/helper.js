import {ObjectId} from "mongodb";
import { client } from "../app.js";

export async function getCategory(request) {
    return await client.db("test").collection("Category").find(request.query).toArray();
      
  }

  export async function getCate() {
    return await client.db("test").collection("Category").find({}).toArray();
      
  }

  export async function createUser(data){
    return await client.db("test").collection("UserInfo").insertMany([data]);
  }

  export async function loginUser(email){
    return await client.db("test").collection("UserInfo").findOne({email})
  }

  export async function AddCategory(data){
    return await client.db("test").collection("Category").insertMany([data]);
  }

  export async function ViewCategory(){
    return await client.db("test").collection("Category").find({}).toArray();
  }

export async function AddProduct(data){
  return await client.db("test").collection("Product").insertMany([data]);
}

export async function ViewProduct(){
  return await client.db("test").collection("Product").find({}).toArray();
}

export async function getProductById(id){
  return await client.db("test").collection("Product").findOne({id});
}



export async function getProductBySlug(slug){
  return await client.db("test").collection("Product").findOne({slug});
}
export async function getCateBySlug(slug){
  return await client.db("test").collection("Category").findOne({slug});
}

  
export async function updateProductById(id, data) {
  return await client.db("test").collection("Product").updateOne({id},{ $set: data });
}