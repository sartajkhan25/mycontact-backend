const asynchandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


const validateToken = asynchandler(async(req, res, next)=>{
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        
        //verify this token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded)=>{
            if(error){
                res.status(401);
                throw new Error("User is not authorized to access") //kisi aur ka hoga
            }
            console.log(decoded)
            req.user  = decoded.user
            next()
        })
    }

    if(!token){
        res.status(401);
        throw new Error("User is not authorised ot token is missing") 
    }


})

module.exports = validateToken