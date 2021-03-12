const express =  require("express");
const { getOrders,placeOrder } = require("../controller/order-controller");
const orderRouter =  express.Router();

orderRouter.get("/",getOrders);
orderRouter.post("/",placeOrder);

module.exports = {orderRouter}