const express =  require("express");
const categoryRouter = express.Router();

categoryRouter.get("",(req,res)=>{
    res.json({"message":"Category Router API"})
})

module.exports = {categoryRouter}