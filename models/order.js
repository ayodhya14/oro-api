const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    userId :  {
        type: String,
        required: true
    },
    productId :  {
        type: String,
        required: true
    },
    qty: {
        type: Number,
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