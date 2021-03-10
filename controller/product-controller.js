const { Product } = require("../models/product")
const { UPLOAD_FOLDER } = process.env;
const joi = require("joi");
const { string } = require("joi");


async function getProducts(req, res) {
    const products = await Product.find().sort({_id:-1});
    return res.json({ products })
}

async function getProductById(req, res) {
    const _id = req.params.product_id;
    const products = await Product.findOne({_id});
    return res.json({ products })
}

function validateProductData(productData) {
    const productSchema = joi.object({
        name: joi.string().min(4).max(50).required(),
        price: joi.number().min(1).required(),
        discount: joi.number(),
        category: joi.string().required(),
        active: joi.boolean()
    });
    const result = productSchema.validate(productData);
    return result;
}


async function createProduct(req, res, next) {
    // console.log("File:",req.file);

    if(req.file)
    {
        const productImage = UPLOAD_FOLDER + "/" + req.file.filename;
        console.log("productImagePath: ",productImage);

        //validate product data 
        const validationResult = validateProductData(req.body);

        if (validationResult.error) {
            return next(new Error(validationResult.error.details[0].message))
        }

        let product = new Product({
            ...validationResult.value,
            productImage
        })
        
        //save product
        product = await product.save();
        
        res.json(product)
    }
    else
    {
        return next(new Error("Image field is required!!! so please add image"))
    }
    
}

module.exports = { getProducts, getProductById, createProduct }