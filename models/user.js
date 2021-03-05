const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating schema
const userSchema = new Schema({
    name: {type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    active:{type:Boolean,default:true},
    phone:{type:String}
},{timestamps: {createdAt:"created_at",updatedAt:"updated_at"}})

// creating model

const User = mongoose.model("user",userSchema)

module.exports = { User }