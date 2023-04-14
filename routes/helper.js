import {ObjectId} from "mongodb";
import { client } from "../app.js";

// -----------Credentials--------------------------------------//
export async function createUser(data){
  return await client.db("test").collection("UserInfo").insertMany([data]);
}

export async function getUserByEmail(email){
return await client.db("test").collection("UserInfo").findOne({email});
}

export async function loginUser(email){
    return await client.db("test").collection("UserInfo").findOne({email})
  }


// -------------------------------------------------------------------------//



// ---------------------Category------------------------//
  
  export async function AddCategory(data){
    return await client.db("test").collection("Category").insertMany([data]);
  }

  export async function ViewCategory(){
    return await client.db("test").collection("Category").find({}).toArray();
  }

  export async function getCateBySlug(slug){
  return await client.db("test").collection("Category").findOne({slug});
}

export async function getCategory(request) {
  return await client.db("test").collection("Category").find(request.query).toArray();
    
}

export async function getCate() {
  return await client.db("test").collection("Category").find({}).toArray();
    
}


// -------------------------------------------------------------------------//


// -----------------------------------Product-----------------------------//
export async function getProductById(id){
  return await client.db("test").collection("Product").findOne({_id:ObjectId(id)});
}

export async function getProductBySlug(slug){
  return await client.db("test").collection("Product").find({slug}).toArray();
}

export async function updateProductById(id, data) {
  return await client.db("test").collection("Product").updateOne({_id : ObjectId(id) },{ $set: data });
}


export async function ViewProduct(){
  return await client.db("test").collection("Product").find({}).toArray();
}

export async function AddProduct(data){
  return await client.db("test").collection("Product").insertMany([data]);
}

export async function getAllProduct(request){
  return await client.db("test").collection("Product").find(request.query).toArray();
}

export async function getAllProductById(id){
  return await client.db("test").collection("Product").findOne({_id:ObjectId(id)});
}

export async function deleteProductById(id) {
  return await client.db("test").collection("Product").deleteOne({ _id : ObjectId(id) });
}
// -------------------------------------------------------------------------//