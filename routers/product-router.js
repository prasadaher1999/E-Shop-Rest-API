const express = require("express");
const productRouter = express.Router();

productRouter.get("",(req,res)=>{
    res.json({"message":"Product API"})
})

module.exports = {productRouter}