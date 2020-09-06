const express = require("express");
const Order = require("../models/order");
const router = express.Router();

// GET METHOD TO GET ALL ORDERS
router.get("/", async (req, res) => {
  let allOrders = await Order.find();
  res.send(allOrders);
});

//POST Method - Add an Order
router.post("/", async (req, res) => {
  //  Validation
  if (
    !req.body.userId &&
    !req.body.products &&
    // !req.body.products.productId &&
    // !req.body.products.qty &&
    !req.body.subTotal &&
    !req.body.totQty &&
    !req.body.date
  ) {
    return res.status(400).send("Not all mandotry values have been set!");
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
