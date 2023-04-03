const asynchandler = require("express-async-handler");
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt  = require("jsonwebtoken")


//@description Register a user
//@route POST /api/users/register
//@access public
const registerUser = asynchandler(async (req, res)=>{
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        res.status(404);
        throw new Error("All Fields are required")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(404);
        throw new Error("User is already registered")
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({_id:user._id, email:user.email})
    } else{
        res.status(404);
        throw new Error("User data is not valid.")
    }
})

//@description Login user 
//@route POST /api/users/login
//@access public
const loginUser = asynchandler(async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        res.status(400);
        throw new Error("All Fields are required")
    }
    const user  = await User.findOne({email})

    if(user && bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign(
            {
                user:{
                    username: user.username,
                    email: user.email,
                    id:user.id,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
        )
        res.status(200).json({accessToken})
    } else{
        res.status(404);
        throw new Error("USER or PASSWORD is INCORRECT") 
    }

})

//@description Current user
//@route GET /api/users/register
//@access public
const currentUser = asynchandler(async (req, res)=>{
    res.status(200).json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}