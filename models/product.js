const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    name: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    description :  {
        type: String,
        minlength: 4,
        maxlength: 100,
        required: true
    },
    availableQty: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;