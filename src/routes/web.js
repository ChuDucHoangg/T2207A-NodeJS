const express = require("express");
const router = express.Router();
const controller = require("./../controllers/web.controller");

// kiem tra dang nhap
function requireLogin(req, res, next) {
    if (req.session.auth && req.session.auth.email) {
        next();
    } else {
        res.redirect("/auth/login");
    }
}

router.get("/",controller.home)

router.get("/change", requireLogin, controller.change);
router.post("/change", requireLogin, controller.postChangePassword);

router.get("/about",controller.about)

module.exports = router;