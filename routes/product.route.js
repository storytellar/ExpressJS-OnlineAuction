var express = require("express");
var router = express.Router();

var controller = require("../controllers/product.controller");

const localMiddleware = require('../middlewares/locals.middleware')
const authMiddleware = require('../middlewares/auth.middleware')

// middleware
// router.use(express.json());

// Thêm link ở dưới đây
// localhost/user/ + ....
router.get("/detail/:id", localMiddleware.getMenu, localMiddleware.getAuthUser, controller.showDetailItem);
router.post("/detail/:id", authMiddleware.userRestrict,  controller.bidingAndBuy);

router.get("/category", localMiddleware.getMenu, controller.category);
router.get("/search", localMiddleware.getMenu, controller.search);

module.exports = router;


