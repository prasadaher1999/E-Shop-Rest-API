const express = require("express");
const {createConnection} = require("./database/connection");
const application = express();
const morgan = require("morgan"); 
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
    res.json({"message":"success"})
})

application.get('/about',(req,res)=>{
    res.json({"message":"about page"})
})