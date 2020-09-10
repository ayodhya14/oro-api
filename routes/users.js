const express = require('express');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const router = express.Router();
// const jwt = require("jsonwebtoken");

//created secret key from online tool
const SECRET_KEY = "Y4w8atbcZFRfsWdMNvBea5TeqrUHtWLaVQURv25T1bU=";

// GET METHOD TO GET ALL PRODUCTS
router.get('/', async (req, res) => {
    let allUsers = await User.find();
    res.send(allUsers);
});

//GET WITH PARAMS- Get User Profile 
router.get('/:userId', async (req, res) => {
    let user = await User.findById(req.params.userId);

    if (!user) {
        return res.sendStatus(404).send("User for the given Id does not exist");
    }

    res.send(user);
});


//POST Method - Register an User
router.post('/', async (req, res) => {

// //Allow to users send token (x- any kind of a header that an user requesting a token to send)
//   const token = req.header("x-jwt-token");
//   if (!token) return res.status(401).send("Access denied.No token!")

//   try{
//     jwt.verify(token, SECRET_KEY);
//   }catch(e){
//     res.status(400).send("Invalid Token!");
//   }

      // Validations - All Feilds are empty
      if(!req.body.firstName &&
        !req.body.lastName && 
        !req.body.address && 
        !req.body.email && 
        !req.body.gender && 
        !req.body.mobile && 
        !req.body.password
        ){
         return res.status(404).send("Not all mandotry values have been set!");
     }

     //validation for First name
     if(!req.body.firstName){
         return res.status(404).send("First Name cannot be blank!");
     }

     //validation for Last name
     if(!req.body.lastName){
          return res.status(404).send("Last Name cannot be blank!");
      }

    //validation for Gender
     if(!req.body.gender){
          return res.status(404).send("Gender cannot be blank!");
      }  
      
     //validation for Mobile
     if(!req.body.mobile){
          return res.status(404).send("Mobile cannot be blank!");
      } 
      else if(!req.body.mobile.includes("+94") && (!req.body.mobile.length !== 12)){
        return res.status(400).send("Invalid Mobile number!");
      } 
    
     //validation for Address
     if(!req.body.address){
          return res.status(404).send("Address cannot be blank!");
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
     
    //Check if this user email already exisits
    let haveUserEmail = await User.findOne({email: req.body.email});
    if(haveUserEmail){
        return res.status(401).send('This user already exists!');
    } 

    //Check if this user mobile already exisits
    let haveUserMobile = await User.findOne({mobile: req.body.mobile});
    if(haveUserMobile){
        return res.status(401).send('This Mobile Number have already used!');
    } 

    else{   
        try{

            //Password Encrypt using a to b method
            // newUser.password = Buffer.from(newUser.password).toString('base64');
            
            //Password Encrypt using bcrypt
            let salt = await bcrypt.genSalt(10);
            let hashpassword = await bcrypt.hash(req.body.password,salt)
            
            let newUser =  new User ({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                email: req.body.email,
                gender: req.body.gender,
                mobile: req.body.mobile,
                password: hashpassword,
            });

            newUser =  await newUser.save();
            res.send(newUser);
        
        }catch(e){
            return res.status(500).send(e.message);
        }
    }

});

//PUT Method - Update User Profile
router.put('/:userId', async (req, res) => {
 
    
    try{
        let user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: { firstName: req.body.firstName, 
                address: req.body.address ,
                gender: req.body.gender , 
                mobile: req.body.mobile,
                lastName: req.body.lastName } },
            { new: true, useFindAndModify: false }
        );
        user = await user.save();
        res.send(user);
    
    }catch(e){
        return res.status(500).send(e.message);
    }
    
});

module.exports = router;