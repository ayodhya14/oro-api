const express = require('express');
const Product = require('../models/userLogin');
const router = express.Router();

// POST method for Login User
router.post("/",(req, res) => {
//   //If email exists in db send back a 400 error saying that he's already registered.
// //   if(user.findOne({req.body.email}) == true){
// //       var err = new Error ('A user with that email has already registered. Please use a different email.')
// //       err.status = 400;
// //       return next(err);
// //     }
//   else if(!req.body.email){
//     return res.status(400).send("Not all mandotry values have been set!");
//     return res.status(400).send("This email have been already registered!");
//   }
  //Validation chcks on other parameters (un,password)
//   else if(!req.body.username && !req.body.password){
//     return res.status(400).send("Not all mandotry values have been set!");
    
//   }
//   try{
//       let user = new user({
//           username: req.body.username,
//           email: req.body.email,
//           password: req.body.password,
//       });

//       user = await user.save();

//       return res.send({
//           username: user.username,
//           email: user.email,
//       });
//   }catch(e){
//       return res.status(500).send(e.message);
//   }
});