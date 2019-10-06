const express  = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const config = require('../config/database');
const authHelpers = require('../Utils/AuthHelpers');

//Register
router.post('/register', (req,res,next)=>{

    let newUser = new user({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    
    user.addUser(newUser, (err, user)=>{
        if(err)
        {
            res.json({success: false, msg: "Failed to register user"});
        }else{
            res.json({success: true, msg: "User registered"});
        }
    });
});

//Authenticate
router.post('/authenticate', (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    user.getUserByUsername(username, (err, userObj)=>{
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        console.log(userObj);
        user.comparePassword(password, userObj.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                
                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                  });

                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: userObj._id,
                        name: userObj.name,
                        username: userObj.username,
                        email: userObj.email
                    }
                })
            }else{
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    })
});

//Profile
router.get('/profile', (req,res)=>{
    authHelpers.validateToken(req, (isValid, msg)=>{
        console.log(isValid, msg);
        return res.json({success:isValid, message: msg});
    });
});

//Validate
router.get('/validate', (req,res,next)=>{
    res.send('VALIDATE');
});

module.exports = router;
