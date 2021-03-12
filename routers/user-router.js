const express = require("express");
const userRouter = express.Router();
const {getUsers, saveUser, loginUser, updateUser, updateUserById} = require("../controller/user-controller");
const { userAuthMiddleWare,adminAuthMiddleWare } = require("../middlewares/user-auth-middleware");
const {getOrderByUser} = require("../controller/order-controller")



//api/users (Get user)
userRouter.get("/",getUsers)

//api/users (Save user)
userRouter.post("/",saveUser)

// Get Orders of user
userRouter.get("/:userId/orders",userAuthMiddleWare,getOrderByUser)

// api/users (Update user)
userRouter.put("/",userAuthMiddleWare,updateUser)

// api/users (Admin:Update user by id)
userRouter.put("/:user_id",adminAuthMiddleWare,updateUserById)

// login user
userRouter.post('/login',loginUser)

module.exports = {userRouter}