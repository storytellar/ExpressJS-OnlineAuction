const express = require("express");
const exphbs = require("express-handlebars");
const hbs_sections = require("express-handlebars-sections");

// const hbs = require("handlebars"); //
//  hbs.registerPartial("./views/components/");//
// //exphbs.registerPartial("views/components/");

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



// Default index
app.get("/", (req, res) => {
  // DATA GIẢ - KHI NÀO CÓ DATA TỪ DATABASE THÌ
  // LẤY TỪ DATABASE VÀ GÁN XUỐNG 5 BIẾN
  const top5ketthuc = [
    {
      ID: 0,
      itemName: "Lô 6 người Do Thái",
      price: "180.000.000",
      top1: "Hitler",
      postDate: "23/10/2019",
      timeLeft: "3 ngày",
      numOfBid: "26",
      imgLink: "/public/images/jews.jpg",
    },
    {
      ID: 1,
      itemName: "Lô 70 người Do Thái",
      price: "180.000.000",
      top1: "Hitler",
      postDate: "23/10/2019",
      timeLeft: "3 ngày",
      numOfBid: "26",
      imgLink: "/public/images/jews.jpg",
      isLoved: true
    },
    {
      ID: 2,
      itemName: "Lô 80 người Do Thái",
      price: "180.000.000",
      top1: "Hitler",
      postDate: "23/10/2019",
      timeLeft: "3 ngày",
      numOfBid: "26",
      imgLink: "/public/images/jews.jpg"
    },
    {
      ID: 3,
      itemName: "Lô 90 người Do Thái",
      price: "180.000.000",
      top1: "Hitler",
      postDate: "23/10/2019",
      timeLeft: "3 ngày",
      numOfBid: "26",
      imgLink: "/public/images/jews.jpg"
    },
    {
      ID: 4,
      itemName: "Lô 10 người Do Thái",
      price: "180.000.000",
      top1: "Hitler",
      postDate: "23/10/2019",
      timeLeft: "3 ngày",
      numOfBid: "26",
      imgLink: "/public/images/jews.jpg",
      isLoved: true
    }
  ];
  const top5xuhuong = top5ketthuc;
  const top5sieupham = top5ketthuc;


  res.render("home", {
    top5ketthuc,
    top5xuhuong,
    top5sieupham  
  });

  
});

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
