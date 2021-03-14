const mongoose = require("mongoose");
const {DB_URL} = process.env

async function createConnection() {
    
    console.log("creating connection...");

    const connection = await mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})

    if(connection){
        console.log("Connected :)");
    }else{
        console.log("failed to connect to MongoDB :(")
    }

}

module.exports = { createConnection }