const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const auth = require('../middleware/authToken');

//created secret key from online tool
const SECRET_KEY = "Y4w8atbcZFRfsWdMNvBea5TeqrUHtWLaVQURv25T1bU=";

//User login
router.post("/", async (req, res) => {


     if(req.body.loginType == "Normal"){

          // Validations - All Feilds are empty
          if(!req.body.mobile && !req.body.password){
               return res.status(404).send("Not all mandotry values have been set!");
          }
     
          //validation for Email
          if(!req.body.email){
               return res.status(404).send("Email cannot be blank!");
          } 
          else if (!req.body.email.includes("@" && ".com")){
               return res.status(400).send("Invalid Email Address!");
          } 
     
          //validation for Password
          if(!req.body.password){
               return res.status(404).send("Password cannot be blank!");
          } 
     }

     try{
          let user = "";
          let user1 = "";
          let validpassword = "";
          let token = "";
          let newUser = {};

          if(req.body.loginType == "Normal"){

               //----NORMAL USER LOGIN------
               //compare email
               user = await User.findOne({ email: req.body.email});
               if(!user) return res.status(400).send("Invalid Email or Password!");
               //compare the encrypted password
               validpassword =await bcrypt.compare(req.body.password, user.password);
               if (!validpassword) return res.status(400).send("Invalid Email or Password!");  
       
               //create jwt token using user id and email
               token = jwt.sign({id: user._id, email: user.email}, SECRET_KEY, {
                 //    expiresIn: "24h"
               });


                //----SIGN IN WITH GOOGLE LOGIN------
          } else if (req.body.loginType == "Google") {
              
               //Validate the existing email or not
               user = await User.findOne({ email: req.body.email});

               //Check user existing related to the email?  If existing user get the email and check with the email
               if (!user || user.email !== req.body.email) {

                    //Password Encrypt using bcrypt
                    let salt = await bcrypt.genSalt(10);
                    let hashpassword = await bcrypt.hash(req.body.password,salt)

                    //Register new user when sign in with Google
                    newUser = new User ({
                         firstName: req.body.firstName,
                         lastName: req.body.lastName,
                         address: "Sri Lanka",
                         email: req.body.email,
                         gender: "0",
                         mobile: "0",
                         password: hashpassword,
                    });
     
                    newUser =  await newUser.save();
                    res.send(newUser);
               }

               //compare email
               user1 = await User.findOne({ email: req.body.email});
               //create jwt token using user id and email
               token = jwt.sign({id: user1._id, email: user1.email}, SECRET_KEY, {
                 //    expiresIn: "24h"
               });
         

                //----SIGN IN WITH FACEBOOK LOGIN------
          } else if (req.body.loginType == "Facebook"){

          }

          res.send({
              token: token,
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              gender: user.gender,
              email: user.email,
              address: user.address,
              mobile: user.mobile
           });

     }catch (e){
          res.status(500).send(e.message);
     }   
     
});

module.exports = router;