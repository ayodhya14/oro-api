const express = require('express');
const mongoose = require('mongoose');
const products = require('./routes/products');
const orders = require('./routes/orders');
const users = require('./routes/users');
const cors = require('cors');
const requestTime = require('./middlewares/requestTime');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(requestTime);

app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/users', users);


mongoose
    .connect("mongodb+srv://test:admin@cluster0-ht0et.mongodb.net/orodb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Db successfully ... "))
    .catch(err => console.log("Ërror has occured while connecting to db : ", err));

app.listen(PORT, function () {
    console.log("Listening on Port - " + PORT);
});