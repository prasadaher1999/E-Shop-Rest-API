const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating schema

const productSchema = new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    discount:{type:Number,default:0},
    productImage:{type:String,required:true},
    category:{type:mongoose.Types.ObjectId,ref:"category",required:true},
    active:{type:Boolean,default:true}
},{timestamps: {createdAt:"created_at",updatedAt:"updated_at"}});

// creating Model

const Product  = mongoose.model("product",productSchema);

module.exports = { Product }