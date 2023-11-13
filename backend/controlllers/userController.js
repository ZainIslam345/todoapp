const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');

// @desc register USER
//@route POST /api/users
//@access public
const userRegister = asyncHandler(async(req,res) => {
    const {name,email,password} = req.body;
    console.log(req.body);
    if(!name || !email || !password)  {
        res.status(400);
        throw new Error("please add all fields")
    }
    const alreadyExists = await User.findOne({email})
    if(alreadyExists) {
        res.status(400);
        throw new Error("User alrady registered")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    // console.log("us",user)
    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data")
    }
})
// @desc login USER
//@route POST /api/users/login
//@access public
const userLogin = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password)  {
        res.status(400);
        throw new Error("please add all fields")
    }

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid Credentials")
    }
})

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}
// @desc get USER
//@route GET /api/users/user
//@access private
const getUser = asyncHandler(async(req,res) => {
    const {name,email,_id} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email,
    })

    res.json({message: "Get user"})
})

module.exports = {
    userRegister,
    userLogin,
    getUser,
}