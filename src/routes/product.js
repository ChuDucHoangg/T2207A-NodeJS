const express = require("express");
const router = express.Router();
const controller =  require("./../controllers/product.controller");
router.get("/product",controller.product);
router.get("/addproduct",controller.addproduct);
router.post("/addproduct",controller.postAddProduct);

module.exports = router;