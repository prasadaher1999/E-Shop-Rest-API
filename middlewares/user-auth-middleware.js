const jwt = require("jsonwebtoken");
const {JWT_KEY} = process.env;

function userAuthMiddleWare(req,res,next){
    try {
        // console.log(req);
        const bearerToken = req.headers.authorization;
        let token = null;
        token = bearerToken.split(" ")[1];
        const payLoad = jwt.verify(token,JWT_KEY);
        console.log("PayLoad: ",payLoad);
        req.session={
            user:payLoad
        }
        next();
    }catch (error) {
        console.log("authMiddlewareError:",error);
        res.status(401);
        return res.json({error:"Invalid token !"})

    }    
}

function adminAuthMiddleWare(req,res,next){
    try {
        // console.log(req);
        const bearerToken = req.headers.authorization;
        let token = null;
        token = bearerToken.split(" ")[1];
        const payLoad = jwt.verify(token,JWT_KEY);
        console.log("PayLoad: ",payLoad);
        
        req.session={
            user:payLoad
        }
        if(payLoad.isAdmin){
            return next();
        }
        res.status(401);
        return res.json({error:"You are not authorized(admin) to access resource !"})

    }catch (error) {
        console.log("adminAuthMiddlewareError:",error);
        res.status(401);
        return res.json({error:"Invalid token !"})

    }    
}

module.exports = {userAuthMiddleWare, adminAuthMiddleWare}