const express = require('express');
const User = require('../models/user');
const router = express.Router();

//POST Method - Register an User
router.post('api/users', async (req, res) => {
 
    //Validation
    if(!req.body.firstName && !req.body.lastName && !req.body.address && !req.body.email && !req.body.gender && !req.body.mobile){
        return res.status(400).send("Not all mandotry values have been set!");
    }
    
    try{
        let newUser =  new User ({
            firstName: req.body.firstName
            // lastName: req.body.lastName,
            // address: req.body.address,
            // email: req.body.email,
            // gender: req.body.gender,
            // mobile: req.body.mobile
        });
        newUser =  await newUser.save();
        res.send(newUser);
    
    }catch(e){
        return res.status(500).send(e.message);
    }
    
});

module.exports = router;