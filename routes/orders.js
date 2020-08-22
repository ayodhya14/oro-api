const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.get('/', async (req, res) => {
    let allOrders = await Order.find();
    res.send(allOrders);
});


//POST Method - Add an Order
router.post('/api/orders', async (req, res) => {
 
     //Validation
    // if(!req.body.name && !req.body.description && !req.body.availableQty){
    //      return res.status(400).send("Not all mandotry values have been set!");
    // }

    try{
        let newOrder =  new Order ({
            // userId: req.body.userId,
            // productId: req.body.productId,
            // qty: req.body.quantity,
            // subTotal: req.body.subTotal,
            // date: req.body.orderDate
        });
        newOrder = await newOrder.save();
        res.send(newOrder);
    }catch(e){
        return res.status(500).send(e.message);
    }
    
});

module.exports = router;