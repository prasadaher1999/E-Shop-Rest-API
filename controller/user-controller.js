const { User } = require("../models/user");
const joi = require("joi");
const passwordHash = require("password-hash");

function getUsers(req, res) {
    res.json({ "message": "User API is working" })
}

function validateUserForRegistration(user) {

    // validating user data
    const schema = joi.object({
        name: joi.string().min(4).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        phone: joi.string().min(10).max(10).required()
    })

    const result = schema.validate(user);
    console.log("Result: ", result)
    return result;

}

async function saveUser(req, res, next) {
    body = req.body;
    // console.log("BODY: ", body);
    const result = validateUserForRegistration(body);

    if (result.error) {
        // throw error
        res.status(400);
        // return res.json({ "message": result.error.details[0].message })
        return next(new Error(result.error.details[0].message))
    }
    const userData = result.value;

    // const userData = req.body;
    // console.log(userData);

    // check unique email
    let userEmail = await User.findOne({ 'email': userData.email });
    // console.log("userEmail:",userEmail);

    if (!userEmail) {
        // userEmail = await new User(userData).save();
        // res.json(userEmail)
    }
    else {
        // throw error
        res.status(400);
        // return res.json({ message: "Email Already Registered !!!" });
        return next(new Error("Email Already Registered !!!"));
    }

    // check unique phone number

    let phoneNumber = await User.findOne({ 'phone': userData.phone });

    if (!phoneNumber) {
        userData.password = passwordHash.generate(userData.password);

        const user = await new User(userData).save();
        res.json(user)
    }
    else {
        res.status(400);
        // return res.json({message:"Phone Number Already Exist !!!"})
        return next(new Error("Phone Number Already Exist"));

    }

}

module.exports = { getUsers, saveUser }