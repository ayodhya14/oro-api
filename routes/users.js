const express = require('express');
const User = require('../models/user');
const router = express.Router();

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
 
    console.log("request");
    console.log(req);
    //Validation
    if(!req.body.firstName && !req.body.lastName && !req.body.address && !req.body.email && !req.body.gender && !req.body.mobile && !req.body.password){
        return res.status(400).send("Not all mandotry values have been set!");
    }
    
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

router.put('/:heroId', async (req, res) => {
    let hero = await Hero.findOneAndUpdate(
        { _id: req.params.heroId },
        { $set: { likeCount: req.body.likeCount } },
        { new: true, useFindAndModify: false }
    );
    res.send(hero);
});



module.exports = router;