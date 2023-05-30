require("dotenv").config();
const express = require('express');
const router = express.Router();
const user = require("../models/userModel");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
// Start-- create new user -- this route will create new user
router.post("/createUser",
    [
        body('fName', "Enter a valid name").isLength({ min: 3 }),
        body('email', "Enter a valid email").isEmail(),
        body('password', "Enter password atleast 5 characters").notEmpty().isLength({ min: 5 })
    ],
    async (req, res) => {
        const result = validationResult(req);
        let msg;
        let detailMsg;
        let success;
        // means error in user credentials 
        if (result.errors.length != 0) {
            msg = "invalid credentials";
            success = false;
            res.status(400).json({
                "msg": msg,
                "success": success,
                "error": result.errors
            });
        } else {
            // there is no error in credentials
            const { fName, lName, email, password } = req.body;
            const findUser = await user.findOne({ email: email });
            //first find user if exists
            if (findUser) {
                msg = "user exists";
                detailMsg = "Please login"
                res.status(400).json({
                    "msg": msg,
                    "detail msg": detailMsg,
                    "success": false
                })
            } else {
                // encrypt their password first
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashedPassword = bcrypt.hashSync(password, salt);
                const newUser = new user({
                    email: email,
                    userDetails: {
                        fName: fName,
                        lName: lName,
                        password: hashedPassword
                    }
                });
                await newUser.save();
                //find that user and send back with token
                const jwtToken = jwt.sign({userId : newUser._id },process.env.JWT_SECRET);
                msg = "new user created";
                res.json({
                    "msg": msg,
                    "token" : jwtToken,
                    "success": true
                })
            }
        }
});
// Ends-- create new user -- this route will create new user
// const jwtToken = jwt.sign({userId :  "param sutra" },process.env.JWT_SECRET);
// console.log(jwtToken);
// jwt.verify(jwtToken,process.env.JWT_SECRET, function(err, decoded) {
//     console.log(decoded.userId) 
// });
// Starts --logIn user -- this route logIns user
router.post("/loginUser",
    [
        body('email', "Enter a valid email").isEmail(),
        body('password', "Enter password atleast 5 characters").notEmpty()
    ],
    async (req,res)=>{
        const result = validationResult(req);
        let msg;
        let detailMsg;
        let success;
        // first check whether valid credentials are given
        if (result.errors.length != 0) {
            //not valid credentials
            msg = "invalid credentials";
            success = false;
            res.status(400).json({
                "msg": msg,
                "success": success,
                "error": result.errors
            });
        }else{
           //valid credentials now check is user exist
           const {email,password} = req.body;
           const findThatUser = await user.findOne({email:email});
           if (!findThatUser) {
              msg = "user notfound",
              detailMsg = "Please loin with correct credentials",
              success = false;
               res.status(400).json({
                "msg" : msg,
                "sucess" : success,
                "detailMsg" : detailMsg
               })
           }else{
             //user found now check password 
             const isPassMatched = bcrypt.compareSync(password, findThatUser.userDetails.password);
             if (isPassMatched) {
                const jwtToken = jwt.sign({userId : findThatUser._id },process.env.JWT_SECRET);
                res.json({
                    "msg" : "user logedin",
                    "sucess" : true,
                    "token" : jwtToken
                })
             }else{
                //password did not matched
                res.status(400).json({
                    "msg" : "incorrect password",
                    "sucess" : false,
                    "detailMsg" : "incorrect password"
                })
             }
           }

        }
    }
)
// Ends --logIn user -- this route logIns user

// Starts -- fetch user -- this route fetches user and send details of user

// Ends -- fetch user -- this route fetches user and send details of user

module.exports = router;