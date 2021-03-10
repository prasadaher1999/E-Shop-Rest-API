const express = require("express");
const {adminAuthMiddleWare} = require("../middlewares/user-auth-middleware")
const { getProducts,getProductById,createProduct } = require("../controller/product-controller");
const productRouter = express.Router();
const path = require("path")
const mongoose = require("mongoose");
var multer  = require('multer');
// const UPLOAD_FOLDER = "media/products";
const {UPLOAD_FOLDER} = process.env;
const tempMulter = multer({dest:UPLOAD_FOLDER});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    const filePath = path.join(__dirname,"../") + UPLOAD_FOLDER;
    console.log("File Path:",filePath);
    cb(null, filePath)
    },
    filename: function (req, file, cb) {
        const fileName = mongoose.Types.ObjectId() + ".png";
      cb(null, fileName);
    }
  })
   
var upload = multer({ storage: storage })


// /api/products
productRouter.get("",getProducts)
// get single product : /api/products/6048adead107a6318c374394
productRouter.get("/:product_id",getProductById)
productRouter.post("",adminAuthMiddleWare,upload.single('image'),createProduct)

module.exports = {productRouter}