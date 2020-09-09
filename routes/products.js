const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const jwt = require("jsonwebtoken");

// const auth = require('../middleware/authToken');

//created secret key from online tool
const SECRET_KEY = "Y4w8atbcZFRfsWdMNvBea5TeqrUHtWLaVQURv25T1bU=";

// GET METHOD TO GET ALL PRODUCTS
router.get('/', async (req, res) => {
     let allProducts = await Product.find();
     res.send(allProducts);
 });

// GET METHOD TO GET PRODUCTS BY PRODUCT TYPE
router.get("/name/:productType", async (req, res) => {

  let products = await Product.find();
  products = products.filter(product => {
    return product.productType.toLowerCase().includes(req.params.productType.toLowerCase())
})
    .map(product => {
        return {
            _id: product._id,
            productType: product.productType,
            imageUrl: product.imageUrl,
            description: product.description,
            availableQty: product.availableQty,
            unitPrice: product.unitPrice,
            name: product.name,
        };
    });
  // let Products = await Product.find({ productType: new RegExp('^'+req.params.productType +'$', "i")}).then(
  //   () => {
  //     return Product.find({ productType: new RegExp('^'+req.params.productType +'$', "i") });
  //   }
  // );
  // console.log(products);
  res.send(products);
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

  //Allow to users send token (x- any kind of a header that an user requesting a token to send)
  const token = req.header("x-jwt-token");
  if (!token) return res.status(401).send("Access denied.No token!")

  try{
    jwt.verify(token, SECRET_KEY);
  }catch(e){
    res.status(400).send("Invalid Token!");
  }

  //Validation
  if (
    !req.body.name &&
    !req.body.description &&
    !req.body.availableQty &&
    !req.body.unitPrice
  ) {
    return res.status(404).send("Not all mandotry values have been set!");
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
