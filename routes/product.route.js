var express = require("express");
var router = express.Router();

var controller = require("../controllers/product.controller");

const localMiddleware = require('../middlewares/locals.middleware')

// middleware
// router.use(express.json());

// Thêm link ở dưới đây
// localhost/user/ + ....
router.get("/detail/:id", localMiddleware.getMenu, controller.showDetailItem);
router.get("/category", localMiddleware.getMenu, controller.category);
router.get("/search", localMiddleware.getMenu, controller.search);

module.exports = router;


