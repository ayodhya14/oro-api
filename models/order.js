const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId :  {
        type: Number,
        required: true
    },
    productId :  {
        type: [Number],
        required: true
    },
    qty: {
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