const mongoose=require("mongoose");

const CategorySchema=new mongoose.Schema({
    
    name:String,
    slug:String,
    descript:String,
    status:String,
    meta_title:String,
    meta_keyword:String,
    meta_description:String,

},{
    collection:"Category"
});

mongoose.model("Category",CategorySchema)