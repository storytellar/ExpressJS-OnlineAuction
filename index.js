const express = require("express");
const exphbs = require("express-handlebars");
const hbs_sections = require("express-handlebars-sections");

var HomeController = require("./controllers/home.controller");

const localMiddleware = require('./middlewares/locals.middleware')

require("express-async-errors");
const app = express();



app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main.hbs",
    helpers: {
      section: hbs_sections()
    }
  })
);
app.set("view engine", "hbs");

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use("/public", express.static("public"));

require('./middlewares/session.middleware')(app);

// Thêm Route ở đây
var userRoute = require("./routes/user.route");
app.use("/user", userRoute);

var adminRoute = require("./routes/admin.route");
app.use("/admin", adminRoute);

var productRoute = require("./routes/product.route");
app.use("/product", productRoute);



// TRANG CHỦ
app.get("/", localMiddleware.getMenu, HomeController.welcome);

// default 404
app.use(function(req, res) {
  res.render("404", {
    layout: false
  });
});

// default error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.render("error.hbs", {
    layout: false,
    err
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`- Đang chạy: http://localhost:${port}`));
