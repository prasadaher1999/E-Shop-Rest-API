const express = require("express");
const userRouter = express.Router();
const {getUsers, saveUser, loginUser, updateUser} = require("../controller/user-controller")

//api/users (Get user)
userRouter.get("/",getUsers)
//api/users (Save user)
userRouter.post("/",saveUser)
// api/users (Update user)
userRouter.put("/",updateUser)
userRouter.post('/login',loginUser)

module.exports = {userRouter}