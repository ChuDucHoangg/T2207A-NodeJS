const express = require("express");
const router = express.Router();
const controller =  require("../controllers/product.controller");

const middleware = require("./../middlewares/role.middleware");
router.use("/addproduct", middleware.role_admin);
router.use("/editproduct/:id", middleware.role_admin);
router.use("/deleteproduct/:id", middleware.role_admin);

//upload file
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"public/images");
    },
    filename: (req,file,cb) =>{
        cb(null,Date.now()+"-"+file.originalname);
    }
});
const upload = multer({storage:storage});

router.get("/product",controller.product);
router.get("/addproduct",controller.addproduct);
router.post("/addproduct",upload.single("image"),controller.postAddProduct);
router.get("/editproduct/:id",controller.formEdit);
router.post("/editproduct/:id",upload.single("image"),controller.update);
router.get("/deleteproduct/:id",controller.delete);

module.exports = router;