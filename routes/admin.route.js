var express = require("express");
var router = express.Router();

var controller = require("../controllers/admin.controller");

// middleware
router.use(express.json());

// Thêm link ở dưới đây
// localhost/admin/ + ....
router.get("/", controller.welcome);
router.get("/categories", controller.showCategory);
router.get("/test", controller.test);

module.exports = router;
