const express = require("express");
const router = express.Router();
const controller =  require("../controllers/category.controller");

const middleware = require("./../middlewares/role.middleware");
router.use("/formcategory", middleware.role_admin);
router.use("/editcategory/:id", middleware.role_admin);
router.use("/deletecategory/:id", middleware.role_admin);

router.get("/category",controller.category);
router.get("/formcategory",controller.formCategory);
router.post("/formcategory",controller.postFormCategory);
router.get("/editcategory/:id",controller.formEdit);
router.post("/editcategory/:id",controller.update);
router.get("/deletecategory/:id",controller.delete);

module.exports = router;