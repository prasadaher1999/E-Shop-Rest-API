const express = require("express");
const userRouter = express.Router();
const {getUsers, saveUser, loginUser, updateUser, updateUserById} = require("../controller/user-controller");
const { userAuthMiddleWare,adminAuthMiddleWare } = require("../middlewares/user-auth-middleware");

//api/users (Get user)
userRouter.get("/",getUsers)
//api/users (Save user)
userRouter.post("/",saveUser)
// api/users (Update user)
userRouter.put("/",userAuthMiddleWare,updateUser)
// api/users (Admin:Update user by id)
userRouter.put("/:user_id",adminAuthMiddleWare,updateUserById)
userRouter.post('/login',loginUser)

module.exports = {userRouter}