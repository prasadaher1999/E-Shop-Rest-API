const {User} = require("../models/user");
const joi = require("joi");

function getUsers(req,res){
    res.json({"message":"User API is working"})
}

async function saveUser(req,res) {
    body = req.body;
    console.log("BODY: ",body);
    const schema = joi.object({
        name: joi.string().min(4).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        phone: joi.number().min(10).required()
    })

    const result = schema.validate(req.body);
    console.log("Result: ",result)
    if(result.error){
        // throw error
        res.status(400);
        res.json({"message":result.error.details[0].message})
    }
    const userData = result.value;

    // const userData = req.body;
    console.log(userData);
    const user = await new User(userData).save();
    res.json(user)
}

module.exports = {getUsers,saveUser}