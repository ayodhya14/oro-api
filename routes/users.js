const express = require('express');
const User = require('../models/user');
const router = express.Router();

//POST Method - Register an User
router.post('/', async (req, res) => {

    //First Validate the request
    const{error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    //Check if this user already exisits
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).send('This user already exisits');
    } 

    // Validations - Feilds are empty or not
    if(!req.body.firstName && !req.body.lastName && !req.body.address && !req.body.email && !req.body.gender && !req.body.mobile && !req.body.password){
        return res.status(400).send("Not all mandotry values have been set!");
    }
    else{   
        try{
            let newUser =  new User ({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                email: req.body.email,
                gender: req.body.gender,
                mobile: req.body.mobile,
                password: req.body.password
            });
            newUser =  await newUser.save();
            res.send(newUser);
        
        }catch(e){
            return res.status(500).send(e.message);
        }
    }
    
});

module.exports = router;