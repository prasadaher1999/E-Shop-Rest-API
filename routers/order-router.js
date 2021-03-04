const express =  require("express");
const { getOrders } = require("../controller/order-controller");
const orderRouter =  express.Router();

orderRouter.get("",getOrders)

module.exports = {orderRouter}