const express =  require("express");
const categoryRouter = express.Router();
const {getCategory,addCategory} = require("../controller/category-controller")


categoryRouter.get("",getCategory)
categoryRouter.post("/",addCategory)

module.exports = {categoryRouter}