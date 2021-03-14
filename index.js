const {application,createConnection} = require("./server")
require("./logger/logger")
application.listen(process.env.PORT || 8000,()=>{
    createConnection();
    console.log(`listening On Port No ${process.env.PORT || 3000}`);
})

console.log("Starting application in index.js");
