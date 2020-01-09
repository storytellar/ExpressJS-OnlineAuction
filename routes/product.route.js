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
router.post("/category/asc", localMiddleware.getMenu, controller.categoryAsc);
router.post("/category/desc", localMiddleware.getMenu, controller.categoryDesc);
router.post("/category/ascDate", localMiddleware.getMenu, controller.categoryAscDate);
router.post("/category/descDate", localMiddleware.getMenu, controller.categoryDescDate);
router.get("/search", localMiddleware.getMenu, controller.search);
router.post("/search/asc", localMiddleware.getMenu, controller.searchAsc);
router.post("/search/desc", localMiddleware.getMenu, controller.searchDesc);
router.post("/search/ascDate", localMiddleware.getMenu, controller.searchAscDate);
router.post("/search/descDate", localMiddleware.getMenu, controller.searchDescDate);

module.exports = router;


