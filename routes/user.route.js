var express = require("express");
var router = express.Router();

var controller = require("../controllers/user.controller");

const localMiddleware = require('../middlewares/locals.middleware')
const restrict = require('../middlewares/auth.middleware').userRestrict;


// middleware
router.use(express.json());

// Thêm link ở dưới đây
// localhost/user/ + ....
router.get("/", restrict, controller.profile);

router.get("/login", controller.login);
router.post("/login", controller.postLogin);

router.get("/signup", controller.signup);
router.post("/signup", controller.postSignup);
// router.get("/profile", controller.profile)
router.get("/signout", controller.signout)


router.get('/profile', restrict, localMiddleware.getAuthUser,  controller.profile);

router.get("/category", controller.category);

router.get("/love", controller.love);

module.exports = router;


