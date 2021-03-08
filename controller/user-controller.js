const { User } = require("../models/user");/* custom module */
const joi = require("joi"); /* for user data validation */
const passwordHash = require("password-hash");/*for password encryption */
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { string } = require("joi");

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

    console.log("userEmail:",userEmail);

    if (userEmail) {
        // password check
        const isPasswordMatched = passwordHash.verify(password, userEmail.password)
        
        if (isPasswordMatched) {
            // login success
            const payLoad = {
                _id : userEmail._id,
                isAdmin : userEmail.isAdmin,
                email : userEmail.email
            }
           const token =  jwt.sign(payLoad,'1234')
            return res.json({success:"login success",jwtToken:token})
        }

    }
    // throw error
    res.status(400);
    const err = new Error("Email or password invalid !!!")
    return next(err);

}

async function updateUser(req,res,next){
    const bearerToken = req.headers.authorization;
    let token = null;

    if(bearerToken){
        // console.log("isdie beartoken if");
        token = bearerToken.split(" ")[1];
        try{
            console.log("inside try block");
            const payLoad = jwt.verify(token,'1234');
            console.log(payLoad);

            const schema = joi.object({
                phone:joi.string().min(10).max(10),
                name:joi.string().min(4).max(30)
            })
            const result = schema.validate(req.body)
            if(result.error){
                return next(new Error(result.error.details[0].message))
            }else{
               const user = await User.findOneAndUpdate({_id:payLoad._id},
                    {
                        $set : result.value
                    },{
                        new:true
                    });
                    res.json(user)
            }
        }
        catch(error){
            res.status(401); //unauthorized
            const err = new Error("Invalid token.")
            return next(err); 
        }
    }else{
        res.status(401); //unauthorized
        const err = new Error("Please Login to update.")
        return next(err);
    }
    res.json({message:'update user'})
}
module.exports = { getUsers, saveUser, loginUser, updateUser }