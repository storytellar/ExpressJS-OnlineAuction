const express = require("express");
const exphbs = require("express-handlebars");
const hbs_sections = require("express-handlebars-sections");

var HomeController = require("./controllers/home.controller");

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

// Thêm Route ở đây
var userRoute = require("./routes/user.route");
app.use("/user", userRoute);

var adminRoute = require("./routes/admin.route");
app.use("/admin", adminRoute);

var productsRoute = require("./routes/products.route");
app.use("/products", productsRoute);



// TRANG CHỦ
app.get("/", HomeController.welcome);

// default 404
app.use(function(req, res) {
  res.render("404", {
    layout: false
  });
});

// default error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.send("err??? default error handler");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`- Đang chạy: http://localhost:${port}`));
