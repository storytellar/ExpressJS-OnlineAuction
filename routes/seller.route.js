var express = require("express");
var router = express.Router();
var controller = require("../controllers/seller.controller");
const restrict = require('../middlewares/auth.middleware').sellerRestrict;


// middleware
router.use(express.json());

router.get("/", controller.welcome);
router.get("/login", controller.login);
router.post("/login", controller.postLogin);
router.post("/logout", controller.logout);
router.get('/mngr', restrict, controller.mngr);

module.exports = router;