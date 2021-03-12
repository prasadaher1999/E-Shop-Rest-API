const joi = require("joi");
const {Product} = require("../models/product");
const {Order} = require("../models/order");


function getOrders(req,res){
    res.json({"message":"Order API iss working"})
}

async function placeOrder(req,res,next) {
    const schema = joi.object({
        orders:joi.array().items({
            product: joi.string().required(),
            user: joi.string().required(),
            address: joi.string().required(),
            quantity: joi.number().min(1).required()
        })
        .min(1)
        .required()
    })
    const validationResult = schema.validate(req.body);
    
    if(validationResult.error){
        return next(new Error(validationResult.error.details[0].message))
    }
    const {orders} = validationResult.value
    // console.log(orders)
    for(index in orders){
        let order = orders[index];
        let productId = order.product;
        let price = (await Product.findOne({_id:productId})).price;
        orders[index].price = price;
    }
    const saveResult = await Order.create(orders)
    res.json({orders:saveResult})
}

module.exports = {getOrders,placeOrder}