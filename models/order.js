const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {Product} = require("../models/product");
 
// creating schema

const orderSchema = new Schema({
    price:{type:Number,required:true},
    product:{type:mongoose.Types.ObjectId,ref:"product",required:true},
    user:{type:mongoose.Types.ObjectId,ref:"user",required:true},
    address:{type:String,required:true},
    quantity:{type:Number,required:true},
    payment_method:{type:String,required:true,default:"COD"},
    status:{type:Boolean,default:false}
},{timestamps: {createdAt:"created_at",updatedAt:"updated_at"}});

// creating Model

const Order  = mongoose.model("order",orderSchema);

module.exports = { Order }