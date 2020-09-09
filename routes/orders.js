const express = require("express");
const Order = require("../models/order");
const router = express.Router();
const jwt = require("jsonwebtoken");

//created secret key from online tool
const SECRET_KEY = "Y4w8atbcZFRfsWdMNvBea5TeqrUHtWLaVQURv25T1bU=";

// GET METHOD TO GET ALL ORDERS
router.get("/", async (req, res) => {
  let allOrders = await Order.find();
  res.send(allOrders);
});

//POST Method - Add an Order
router.post("/", async (req, res) => {

 //Allow to users send token (x- any kind of a header that an user requesting a token to send)
  const token = req.header("x-jwt-token");
  if (!token) return res.status(401).send("Access denied.No token!")

  try{
    jwt.verify(token, SECRET_KEY);
  }catch(e){
    res.status(400).send("Invalid Token!");
  }

// Validations - All Feilds are empty
  if (
    !req.body.userId &&
    !req.body.products &&
    // !req.body.products.productId &&
    // !req.body.products.qty &&
    !req.body.subTotal &&
    !req.body.totQty &&
    !req.body.date
  ) {
    return res.status(404).send("Not all mandotry values have been set!");
  }

  //validation for user
  if(!req.body.userId){
    return res.status(404).send("Blank!");
  }

  //validation for products
  if(!req.body.products){
    return res.status(404).send("Blank!");
  }

  //validation for subtotal
  if(!req.body.subTotal){
    return res.status(404).send("Blank!");
  }

  //validation for totqty
  if(!req.body.totQty){
    return res.status(404).send("Blank!");
  }
  //validation for date
  if(!req.body.date){
     return res.status(404).send("Blank!");
  }

  try {
    let newOrder = new Order({
      userId: req.body.userId,
      products: req.body.products,
      totQty: req.body.totQty,
      subTotal: req.body.subTotal,
      total:req.body.total,
      date: req.body.date,
    });
    newOrder = await newOrder.save();
    res.send(newOrder);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

//PUT Method - Update Order Profile
router.put("/:orderid", async (req, res) => {
if (
        !req.body.userId &&
        !req.body.products &&
        !req.body.totQty &&
        !req.body.subTotal &&
        !req.body.total &&
        !req.body.date
      ) {
        return res.status(400).send("Set all mandatory fields to update the record!");
   }
  try {
    let order = await User.findOneAndUpdate(
      { _id: req.params.orderId },
      {
        $set: {
          products: req.body.products,
          totQty: req.body.qty,
          subTotal: req.body.subTotal,
          total: req.body.total,
          date: req.body.date,
        },
      },
      { new: true, useFindAndModify: false }
    );
    order = await order.save();
    res.send(order);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
