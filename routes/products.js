const express = require('express');
const Product = require('../models/product');
const router = express.Router();

//POST Method - Add a Product
router.post('api/products', async (req, res) => {
 
   //Validation
   if(!req.body.name && !req.body.description && !req.body.availableQty){
        return res.status(400).send("Not all mandotry values have been set!");
   }
   
   try{
        let newProduct =  new Product ({
            name: req.body.productName
            // description: req.body.description,
            // address: req.body.address,
            // type: req.body.type,
            // availableQty: req.body.availableQty,
            // imageUrl: req.body.imageUrl
        });
        newProduct = await newProduct.save();
        res.send(newProduct);

   }catch(e){
    return res.status(500).send(e.message);
}
    
});
 
module.exports = router;