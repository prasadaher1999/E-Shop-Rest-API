const {Category} = require("../models/category");
const {Product} = require("../models/product");
const joi = require("joi");


async function getCategory(req,res){
    const limit = Number.parseInt(req.query.limit);
    console.log({limit})
    const categories = await Category.find().select('_id name').sort({_id:-1}).limit(limit || 10);
    const total_Category = await Category.countDocuments();
    return res.json({total_Category,categories})
}

async function getCategoryById(req,res){
    const _id = req.params.category_id;
    const category = await Category.findOne({_id:_id});
    res.json({category});
}

async function addCategory(req,res,next) {
    const schema = joi.object({
        name:joi.string().required()
    })
    const validationResult = schema.validate(req.body);
    console.log("Result:",validationResult);

    if(validationResult.error){
        res.status(400);
        return next(new Error(validationResult.error.details[0].message));
    }else{
        const name = validationResult.value.name;
        console.log("categoryName:",name);
        const category = await new Category({name:name}).save();
        // console.log(category);
        return res.json(category);
    }
}

async function getProductByCategory(req,res,next){
    console.log(req.params)
    category_id = req.params.category_id;
    const products = await Product.find({category:category_id}).populate("category")

    res.json(products)
}
module.exports = {getCategory,addCategory,getCategoryById, getProductByCategory}