const {Category} = require("../models/category");
const joi = require("joi");

async function getCategory(req,res){
    const categories = await Category.find().select('_id name').sort({_id:-1})
    return res.json({categories})
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

module.exports = {getCategory,addCategory,getCategoryById}