const express = require("express");
const exphbs = require("express-handlebars");
require("express-async-errors");
const app = express();

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main.hbs"
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
var User = require("./routes/user.route");
app.use("/user", User);

app.get("/", (req, res) => {
  res.render("home");
});

// default 404
app.use(function(req, res) {
  res.send("what??? default 404");
});

// default error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.send("err??? default error handler");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`- Đang chạy: http://localhost:${port}`));
