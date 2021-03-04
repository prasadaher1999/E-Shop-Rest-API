const express = require("express");
const userRouter = express.Router();

userRouter.get("",(req,res)=>{
    res.json({"message":"User API"})
})

module.exports = {userRouter}