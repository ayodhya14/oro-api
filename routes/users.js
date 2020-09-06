const express = require('express');
const User = require('../models/user');
const UserSession = require('../models/UserSession');
const bcrypt = require("bcrypt");
const router = express.Router();

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

      // Validations - All Feilds are empty
      if(!req.body.firstName &&
        !req.body.lastName && 
        !req.body.address && 
        !req.body.email && 
        !req.body.gender && 
        !req.body.mobile && 
        !req.body.password
        ){
         return res.status(400).send("Not all mandotry values have been set!");
     }

     //validation for First name
     if(!req.body.firstName){
         return res.status(400).send("First Name cannot be blank!");
     }

     //validation for Last name
     if(!req.body.lastName){
          return res.status(400).send("Last Name cannot be blank!");
      }

    //validation for Gender
     if(!req.body.gender){
          return res.status(400).send("Gender cannot be blank!");
      }  
      
     //validation for Mobile
     if(!req.body.mobile){
          return res.status(400).send("Mobile cannot be blank!");
      } 
      else if(!req.body.mobile.includes("+94")){
        return res.status(400).send("Invalid Mobile number!");
      } 
    
     //validation for Address
     if(!req.body.address){
          return res.status(400).send("Address cannot be blank!");
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
     
    //Check if this user email already exisits
    let haveUserEmail = await User.findOne({email: req.body.email});
    if(haveUserEmail){
        return res.status(400).send('This user already exists!');
    } 

    //Check if this user mobile already exisits
    let haveUserMobile = await User.findOne({mobile: req.body.mobile});
    if(haveUserMobile){
        return res.status(400).send('This Mobile Number have already used!');
    } 

    else{   
        try{

            //Password Encrypt using a to b method
            // newUser.password = Buffer.from(newUser.password).toString('base64');
            
            //Password Encrypt using bcrypt
            let salt =await bcrypt.genSalt(10);
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
    
    app.post('/api/userLogin', (req, res) => {
        const{ body} = req;
        const{
            password
        } = body;
        let {
            email
        } = body;

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

        email = email.toLowerCase();

        user.find({
            email: email
        }, (err,users) => {
            if(err) {
                return res.status(400).send("Server error!");
            }
            if (users.length != 1){
                return res.status(400).send("Invalid!");
            }
        })

        // //If correct user
        // const user = users[0];
        // if(!user.validPassword(password)){
        //     return res.status(400).send("Invalid Email or Password!");
        // }

        // new UserSession =  new UserSession();
        // UserSession.userId = user._id;
        // UserSession.save((err,doc) => {
        //     if(err) {
        //         return res.status(400).send("Server Error!");
        //     }

        //     return res.send({
        //         return res.status(200).send("Valid sign in!"),
        //         token: doc._id
        //     });
        // });
    });

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