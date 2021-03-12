const joi = require("joi");
const {Product} = require("../models/product");
const {Order} = require("../models/order");


async function getOrders(req,res){
    // const orders = await Order.find().populate('product user');
     const orders = await Order.find().populate([
         {path:'product',populate:[{path:'category',select:'-created_at -updated_at -__v'}]},
         {path:'user', select:'-password -__v -created_at -updated_at'}
     ]);
    
    res.json({orders:orders})
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

async function getOrderByUser(req,res,next){
    const userId = req.params.userId;
    const userOrder = await Order.find({user:userId}).populate('product')
    res.json({order:userOrder})
}

async function deleteOrder(req,res,next){
    const _id = req.params.orderId;
    const result = await Order.deleteOne({_id:_id});
    res.json({message:'Order Deleted Successfully!!',result})
}

module.exports = {getOrders,placeOrder,getOrderByUser,deleteOrder}