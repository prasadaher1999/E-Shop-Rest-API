const { User } = require("../models/user");/* custom module */
const joi = require("joi"); /* for user data validation */
const passwordHash = require("password-hash");/*for password encryption */
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { string, object } = require("joi");

async function getUsers(req, res) {
    // throw new Error("custome error")
    const users = await User.find().sort({_id:-1});
    return res.json({users})
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
    return result;
    console.log("Result: ", result)

}

async function saveUser(req, res, next) {
    body = req.body;
    // console.log("Body:", body);
    const result = validateUserForRegistration(body);

    if (result.error) {
        // throw error
        res.status(400);
        // return res.json({ "message": result.error.details[0].message })
        return next(new Error(result.error.details[0].message))
    }
    const userData = result.value;

    // console.log(userData);

    /* check unique email */
    let userEmail = await User.findOne({ 'email': userData.email });
    // console.log("userEmail:",userEmail);

    if (!userEmail) {
        // userEmail = await new User(userData).save();
        // res.json(userEmail)
    }
    else {
        /* throw error */
        res.status(400);
        // return res.json({ message: "Email Already Registered !!!" });
        return next(new Error("Email Already Registered !!!"));
    }

    /* check unique phone number */

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

function validateLoginCredentials(user) {

    // validating user data
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    const result = schema.validate(user);
    return result;
    console.log("Result: ", result)

}

async function loginUser(req, res, next) {
    console.log(req.body);
    const result = validateLoginCredentials(req.body);

    if (result.error) {
        res.status(400);
        const err = new Error(result.error.details[0].message)
        return next(err);
    }

    console.log("ResultData:", result);

    const { email, password } = result.value;
    const userEmail = await User.findOne({ email: email })

    console.log("userEmail:", userEmail);

    if (userEmail) {
        // password check
        const isPasswordMatched = passwordHash.verify(password, userEmail.password)

        if (isPasswordMatched) {
            // login success
            const payLoad = {
                _id: userEmail._id,
                isAdmin: userEmail.isAdmin,
                email: userEmail.email
            }
            const token = jwt.sign(payLoad, '1234')
            return res.json({ success: "login success", jwtToken: token })
        }

    }
    // throw error
    res.status(400);
    const err = new Error("Email or password invalid !!!")
    return next(err);

}

async function updateUser(req, res, next) {
    const loggedInUser = req.session.user;

    const schema = joi.object({
        phone: joi.string().min(10).max(10),
        name: joi.string()
    })

    const result = schema.validate(req.body)
    // console.log(result);
    if (result.error) {
        return next(new Error(result.error.details[0].message))
    } else {
        const user = await User.findOneAndUpdate({ _id: loggedInUser._id },
            {
                $set: result.value
            }, {
            new: true
        });
        let {name,phone} = user
        res.json({msg:"updated successfully!",name,phone})
    }

}

async function updateUserById(req, res, next) {
        const user_id = req.params.user_id;

        console.log("User_ID:",user_id);

        let user = await User.findById(user_id);
        user = Object.assign(user,req.body);
        user = await user.save()
        res.json(user)
}




module.exports = { getUsers, saveUser, loginUser, updateUser, updateUserById }