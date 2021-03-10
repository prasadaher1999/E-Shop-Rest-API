const express = require("express");
// environment variable configuartion
require('dotenv').config()

// console.log(process.env);

const {createConnection} = require("./database/connection");
const application = express();
const morgan = require("morgan"); 
const { userRouter } = require("./routers/user-router");
const { productRouter } = require("./routers/product-router");
const { orderRouter } = require("./routers/order-router");
const { categoryRouter } = require("./routers/category-router");
const { handleErrors } = require("./middlewares/error-handler");
const { UPLOAD_FOLDER } = process.env;

//setting middlewares
application.use(express.json())
application.use(morgan('dev'))//for getting server request output

application.listen(process.env.PORT || 8000,()=>{
    console.log(`listening On Port No ${process.env.PORT || 3000}`);
    createConnection()
})

//http request 
application.get('/',(req,res)=>{
    res.json({"message":"API is working"})
})

application.get('/about',(req,res)=>{
    res.json({"message":"about page"})
})


application.use('/api/users',userRouter)
application.use('/api/products',productRouter)
application.use('/api/orders',orderRouter)
application.use('/api/categories',categoryRouter)

application.get("/" + UPLOAD_FOLDER + "/*",(req,res,next)=>{
    const path = req.url;
    console.log(path);
    const filePath = `${__dirname}${path}`;
    res.sendFile(filePath,(error)=>{
        next();
    });
})

application.use(handleErrors)

application.get("*",(req,res)=>{
    res.json({"Message":`Cannot GET ${req.url} Please check the url :(`})
})


// console.log("inside index.js : hashpassword example");

// const passwordHash = require("password-hash")
// const hashPassword = passwordHash.generate("password1234");
// console.log({hashPassword});

// const isvalid = passwordHash.verify("password1234",hashPassword)

// console.log({isvalid});