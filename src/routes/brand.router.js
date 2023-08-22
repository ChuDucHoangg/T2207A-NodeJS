const express = require("express");
const router = express.Router();
const controller =  require("../controllers/brand.controller");

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

router.get("/brand",controller.brand);
router.get("/formbrand",controller.formBrand);
router.post("/formbrand",upload.single("image"),controller.postFormBrand);
router.get("/editbrand/:id",controller.formEdit);
router.post("/editbrand/:id",upload.single("image"),controller.update);
router.get("/deletebrand/:id",controller.delete);

module.exports = router;