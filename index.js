const express = require("express");
const {createConnection} = require("./database/connection");
const application = express();
const morgan = require("morgan"); 
const { userRouter } = require("./routers/user-router");
const { productRouter } = require("./routers/product-router");
const { orderRouter } = require("./routers/order-router");
const { categoryRouter } = require("./routers/category-router");
const portNo = 3000;

//setting middlewares
application.use(express.json())
application.use(morgan('dev'))//for getting server request output

application.listen(portNo,()=>{
    console.log("listening on port no 3000");
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

application.get("*",(req,res)=>{
    res.json({"message":"url not match plz check the url"})
})