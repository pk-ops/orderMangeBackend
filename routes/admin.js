import express from "express";

import {
    AddCategory,
    AddProduct,

    getCate,
    
    getProductById,
    getProductBySlug,
    updateProductById,
    ViewCategory,
    ViewProduct,
} from "./helper.js"

const router = express.Router();



 router.post("/category",async function (req,res){
        const {name,slug,descript,status,meta_title,meta_keyword,meta_description}=req.body;
        
        try{
    
        const result =await AddCategory({
            name,
            slug,
            descript,
            status,
            meta_title,
            meta_keyword,
            meta_description,
        })
        res.send({status:"ok"})
        console.log(result);
    }catch(error){
          res.send({status:"error"})
    }
    })

    router.get("/viewcategory", async function(req,res){
        const category=await ViewCategory()
        if(!category){
            return res.status(401).send({
                message:"Something went wrong"
            });
        }
        res.status(200).send(category);
        // console.log(category)
    } )

    router.post("/addProduct",async function (req,res){
        const {id,category_name,name,slug,descript,status,meta_title,meta_keyword,meta_description,
        selling_price,original_price,qty,brand,img,featured,popular}=req.body;
        
        try{
    
        const result =await AddProduct({
            id,
            category_name,
            slug,
            name,
            descript,
    
            meta_title,
            meta_keyword,
            meta_description,
            
            selling_price,
            original_price,
            qty,
            brand,
            img,
            featured,   
            popular,
            status,
        })
        res.send({status:"ok"})
        console.log(result);
    }catch(error){
          res.send({status:"error"})
    }
    })


    router.get("/viewproduct", async function(req,res){
        const product=await ViewProduct()
        if(!product){
            return res.status(401).send({
                message:"Something went wrong"
            });
        }
        res.status(200).send(product);
        // console.log(category)
    } )

    router.get("/getCategory", async function(req,res){
        const cate = await getCate()
        if(!cate){
            return res.status(401).send({
                message:"Something went wrong"
            });
        }
        res.status(200).send(cate);
        
        // console.log(category)

    } )


    router.get("/editpro/:id",async function(req,res){
        const {id}=req.params;
        console.log(id);
        try{
            const product = await getProductById(id);
            res.send(product)
            
        }catch(err){
            res.status(404).send({ msg : "product not found"});
        }
    
        
    })


    router.get("/getProd/:slug",async function(req,res){
        const {slug}=req.params;
        console.log(slug);

        try{
            const prod = await getProductBySlug(slug)
            res.status(200).send(prod);
            console.log(prod)
        }catch(err){
            res.status(401).send({ message:"Something went wrong"});
        }
       
      
        
    })



    router.post("/updateProduct/:id",async function(req,res){
        const {id}=req.params;
        console.log(req.params,id);
     
     
        try{
            const data=req.body;
            const result=await updateProductById(id, data);
            res.send({ status:'ok',data : result });
        }catch(error){
            res.send({status:"error"})

        }

      
      })

    

export const adminRouter=router;