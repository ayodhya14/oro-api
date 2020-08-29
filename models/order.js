const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    userId :  {
        type: String,
        required: true
    },
    products :  [
        {
            productId :
            {
                type: String,
                required: true
            }, 
            qty: 
            {
                type: Number,
                required: true
            }  
        }      
    ],
    totQty: {
        type: [Number],
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
 });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;