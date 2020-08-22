const express = require('express');
const Order = require('../models/order');
const router = express.Router();

// GET METHOD TO GET ALL ORDERS
router.get('/', async (req, res) => {
    let allOrders = await Order.find();
    res.send(allOrders);
});


//POST Method - Add an Order
router.post('/', async (req, res) => {
 
    //  Validation
    if(!req.body.userId && !req.body.productId && !req.body.qty && !req.body.subTotal && !req.body.date){
         return res.status(400).send("Not all mandotry values have been set!");
    }

    try{
        let newOrder =  new Order ({
            id: req.body.id,
            userId: req.body.userId,
            productId: req.body.productId,
            qty: req.body.qty,
            subTotal: req.body.subTotal,
            date: req.body.date
          
        });
        newOrder = await newOrder.save();
        res.send(newOrder);

    }catch(e){

        return res.status(500).send(e.message);
    }
    
});

module.exports = router;