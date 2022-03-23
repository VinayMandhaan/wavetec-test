const express = require('express')
const router  = express.Router();
const {check, validationResult} = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')



// Login User using Email and Password

router.post("/",[
    check('email', 'Email is required').exists(),
    check('password', 'Password is required').exists()
], async(req,res) => { 
    const errors = validationResult(req)
    
    // Check If Errors
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password} = req.body

    //Check If Email Exists
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({errors : [{msg: 'Invalid Email or Password'}]})
        }

        // Match the encrypted Password with the user provided Password
        const isMatch = await bcrypt.compare(password, user.password)

        // If Password does not match return error
        if(!isMatch){
            return res.status(400).json({errors : [{msg: 'Invalid Email or Password'}]})
        }

        const payLoad = {
            user :{
                 id: user.id
             }
         }
         jwt.sign(payLoad,config.get('jwtSecret'),{expiresIn:36000},(err,token)=>{
            if(err){
                throw err
            }
            res.json({token})
         })

        // // Return user
        // res.json({user})

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server error")
    }
})

// Create User

// Email, Username and Password must be provided
router.post("/create",[
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'enter Password with 6 or more characters').isLength({min:6})
], async(req,res) => { 
    const errors = validationResult(req)

    //Check for errors
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,username,password} = req.body
    try{
        // Check if User Already Exists
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({errors : [{msg: 'Email already exist'}]})
        }

        //Create new User
         user = new User({
             email,
             username,
             password,
         })
         
         //Hash Password Before Saving into the Database
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password,salt)
         await user.save();
         res.json({user})

    }catch(err){
        console.log(err.message)
        res.status(500).send("Server error")
    }


})



module.exports = router