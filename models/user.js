const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    lastName:  {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    address: {
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true        
    },
    gender: {
        type: String,
        required: true        
    },
    mobile: {
        type: Number,
        default : "+9470000000 ",
        required: true
    },
    password: {
        type: String,
        required: true        
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;