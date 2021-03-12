const express =  require("express");
const { getOrders,placeOrder,deleteOrder } = require("../controller/order-controller");
const {userAuthMiddleWare,adminAuthMiddleWare} = require("../middlewares/user-auth-middleware")
const orderRouter =  express.Router();

// /api/orders
// get admin all orders
orderRouter.get("/",adminAuthMiddleWare,getOrders);

// place order
orderRouter.post("/",userAuthMiddleWare,placeOrder);

// delete order
orderRouter.delete("/:orderId",userAuthMiddleWare,deleteOrder);

module.exports = {orderRouter}