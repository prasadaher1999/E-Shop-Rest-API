const express = require("express");
const application = express();
const portNo = 3000;

application.listen(portNo,()=>{
    console.log("listening on port no 3000");
})

application.get('/',(req,res)=>{
    res.json({"message":"success"})
})