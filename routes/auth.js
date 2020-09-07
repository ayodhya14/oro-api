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

     // Validations - All Feilds are empty
     if(!req.body.mobile && !req.body.password){
         return res.status(400).send("Not all mandotry values have been set!");
     }

     //validation for Email
     if(!req.body.email){
          return res.status(400).send("Email cannot be blank!");
     } 
     else if (!req.body.email.includes("@" && ".com")){
          return res.status(400).send("Invalid Email Address!");
     } 

      //validation for Password
     if(!req.body.password){
          return res.status(400).send("Password cannot be blank!");
     } 

     try{
        let user = await User.findOne({ email: req.body.email});
        if(!user) return res.status(400).send("Invalid Email or Password!");

        //compare the encrypted password
        let validpassword =await bcrypt.compare(req.body.password, user.password);
        if (!validpassword) return res.status(400).send("Invalid Email or Password!");  

        //create jwt token using user id and email
        let token = jwt.sign({id: user._id, email: user.email}, SECRET_KEY, {
          //    expiresIn: "24h"
        });
       
        res.send({token: token, user});

     }catch (e){
          res.status(500).send(e.message);
     }   
     
});
module.exports = router;