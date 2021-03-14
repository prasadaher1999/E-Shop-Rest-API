const express = require("express");
const { handleErrors } = require("./middlewares/error-handler");
require('express-async-errors');
// environment variable configuartion
require('dotenv').config()
// console.log(process.env);
const {createConnection} = require("./database/connection");

// creating application
const application = express();

const morgan = require("morgan"); 
const routers = require("./routers/routers");
const { UPLOAD_FOLDER } = process.env;


// throw new Error("error on startup")
// Promise.reject(new Error("From Promise"))

//setting middlewares
application.use(express.json())
application.use(morgan('dev'))//for getting server request output


/* ---------------------------http requests---------------------------*/

application.get('/api/test',(req,res)=>{
    res.json({"message":"API is Working !"})
})

application.use('/api/users',routers.userRouter)
application.use('/api/products',routers.productRouter)
application.use('/api/orders',routers.orderRouter)
application.use('/api/categories',routers.categoryRouter)

application.get("/" + UPLOAD_FOLDER + "/*",(req,res,next)=>{
    const path = req.url;
    console.log(path);
    const filePath = `${__dirname}${path}`;
    res.sendFile(filePath,(error)=>{
        next();
    });
})

application.use(handleErrors)

// when page not found
application.get("*",(req,res)=>{
    res.json({"Message":`Cannot GET ${req.url} Please check the url :(`})
})

/* -------------------------------------------------------*/


/* console.log("inside index.js : hashPassword example");
 const passwordHash = require("password-hash")
 const hashPassword = passwordHash.generate("password1234");
 console.log({hashPassword});
 const isvalid = passwordHash.verify("password1234",hashPassword)
 console.log({isvalid});
 */

console.log("Starting application in Server.js");

module.exports = {application,createConnection};