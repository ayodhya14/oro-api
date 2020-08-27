const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   
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
    },
    unitPrice: {
        type: Number,
        required: true
    },
    imageUrl :{
        type: String
    }
    ,
    productType :{
        type: String,
        enum: ["Necklace", "Earring", "Bangle", "Bracelet","Pendent"],
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;