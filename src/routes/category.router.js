const express = require("express");
const router = express.Router();
const controller =  require("../controllers/category.controller");

router.get("/category",controller.category);
router.get("/formcategory",controller.formCategory);
router.post("/formcategory",controller.postFormCategory);
router.get("/editcategory/:id",controller.formEdit);
router.post("/editcategory/:id",controller.update);
router.get("/deletecategory/:id",controller.delete);

module.exports = router;