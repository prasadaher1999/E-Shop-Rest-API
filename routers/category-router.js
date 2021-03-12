const express =  require("express");
const categoryRouter = express.Router();
const {getCategory,addCategory,getCategoryById,getProductByCategory} = require("../controller/category-controller");
const {adminAuthMiddleWare} = require("../middlewares/user-auth-middleware");

// /api/categories/

categoryRouter.get("/",getCategory);

// get single category: /api/categories/6048bb206a4db45440e7dbe2
categoryRouter.get("/:category_id",getCategoryById)

// get product by category
categoryRouter.get("/:category_id/products",getProductByCategory)

// add category
categoryRouter.post("/",adminAuthMiddleWare,addCategory)

module.exports = {categoryRouter}