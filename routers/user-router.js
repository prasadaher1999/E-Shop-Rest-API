const express = require("express");
const userRouter = express.Router();
const {getUsers, saveUser} = require("../controller/user-controller")

//api/users (GET Requeset)
userRouter.get("",getUsers)
//api/users (POST Requeset)
userRouter.post("",saveUser)


module.exports = {userRouter}