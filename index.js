const express = require("express");
const exphbs = require("express-handlebars");
require("express-async-errors");
const app = express();

// Thêm Route ở đây
var admin = require("./routes/admin.route");
app.use("/admin", admin);

app.get("/", (req, res) => res.send("Trang chủ"));

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main.hbs"
  })
);
app.set("view engine", "hbs");

// default 404
app.use(function(req, res) {
  res.send("what???");
});

// default error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.send("err???");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`- Đang chạy: http://localhost:${port}`));
