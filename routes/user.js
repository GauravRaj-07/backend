const express=require('express')

// User Controller functions
const { signupUser, loginUser } = require('../controllers/userController')

const router=express.Router()

// login route
router.post('/login',loginUser)

//SignUp route
router.post('/signup',signupUser)


module.exports=router;