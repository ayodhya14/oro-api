const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// GET METHOD TO GET ALL PRODUCTS
router.get('/', async (req, res) => {
     let allProducts = await Product.find();
     res.send(allProducts);
 });

// GET METHOD TO GET PRODUCTS BY NAME
router.get("/name/:name", async (req, res) => {
  let Products = await Product.find({ name: req.params.name }).then(
    () => {
      return Product.find({ name: req.params.name });
    }
  );
  res.send(Products);
});

// GET METHOD TO GET PRODUCTS BY ID
router.get("/:id", async (req, res) => {
     let product = await Product.findById(req.params.id);
     
  if (!product) {
    return res
      .sendStatus(404)
      .send("Product for the given Id does not exist on our server");
  }

  res.send(product);
   });


//POST Method - Add a Product
router.post("/", async (req, res) => {
  //Validation
  if (
    !req.body.name &&
    !req.body.description &&
    !req.body.availableQty &&
    !req.body.unitPrice
  ) {
    return res.status(400).send("Not all mandotry values have been set!");
  }

  try {
    let newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      availableQty: req.body.availableQty,
      unitPrice: req.body.unitPrice,
      productType: req.body.productType,
      imageUrl: req.body.imageUrl,
    });

    newProduct = await newProduct.save();
    res.send(newProduct);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
