const express = require("express");
const userRouter = express.Router();
const {getUsers} = require("../controller/user-controller")


userRouter.get("",getUsers)

module.exports = {userRouter}