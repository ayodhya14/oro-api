const express = require('express');
const Product = require('../models/product');
const router = express.Router();


// GET METHOD TO GET ALL PRODUCTS
router.get('/', async (req, res) => {
     let allProducts = await Product.find();
     res.send(allProducts);
 });

//POST Method - Add a Product
router.post('/', async (req, res) => {
 
   //Validation
   if(!req.body.name && !req.body.description && !req.body.availableQty){
        return res.status(400).send("Not all mandotry values have been set!");
   }
   
   try{
        let newProduct =  new Product ({
            name: req.body.name,
            description: req.body.description,
            availableQty: req.body.availableQty,
            productType: req.body.productType
            // address: req.body.address,
            // type: req.body.type,
            // availableQty: req.body.availableQty,
            // imageUrl: req.body.imageUrl
        });
        
        newProduct = await newProduct.save();
        res.send(newProduct);

   } catch(e){
    return res.status(500).send(e.message);
}
    
});
 
module.exports = router;