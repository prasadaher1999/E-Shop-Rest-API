const express =  require("express");
const categoryRouter = express.Router();
const {getCategory} = require("../controller/category-controller")


categoryRouter.get("",getCategory)

module.exports = {categoryRouter}