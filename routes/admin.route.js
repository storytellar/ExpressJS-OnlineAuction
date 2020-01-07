var express = require("express");
var router = express.Router();
var controller = require("../controllers/admin.controller");
const restrict = require('../middlewares/auth.middleware').adminRestrict;


// middleware
router.use(express.json());

// Thêm link ở dưới đây
// localhost/admin/ + ....
router.get("/", controller.welcome);
router.get("/test", controller.test);
router.get("/login", controller.login);
router.post("/login", controller.postLogin);
router.post("/logout", controller.logout);
router.get('/mngr', restrict, controller.mngr);
router.post('/delete', controller.delete);
router.post('/deleteBidder', controller.deleteBidder);
router.post('/edit', controller.edit);
router.post('/downgrade', controller.downgrade);


module.exports = router;
