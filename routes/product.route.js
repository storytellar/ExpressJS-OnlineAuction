var express = require("express");
var router = express.Router();

var controller = require("../controllers/product.controller");

// middleware
// router.use(express.json());

// Thêm link ở dưới đây
// localhost/user/ + ....
router.get("/", controller.profile);

router.get("/category", controller.category);
router.get("/search", controller.search);

module.exports = router;


