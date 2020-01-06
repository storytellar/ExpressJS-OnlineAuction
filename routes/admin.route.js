var express = require("express");
var router = express.Router();

var controller = require("../controllers/admin.controller");

// middleware
router.use(express.json());

// Thêm link ở dưới đây
// localhost/admin/ + ....
router.get("/", controller.welcome);
router.get("/test", controller.test);
router.get("/login", controller.login);
router.post("/login", controller.postLogin);
router.post("/logout", controller.logout);
//router.get("/mngr", controller.mngr);
const restrict = require('../middlewares/auth.middleware');
router.get('/mngr', restrict, async function (req, res) {
    res.render("admin/mngr", { layout: false });
})


module.exports = router;
