const express = require("express");
const { getProducts } = require("../controller/product-controller");
const productRouter = express.Router();

productRouter.get("",getProducts)

module.exports = {productRouter}