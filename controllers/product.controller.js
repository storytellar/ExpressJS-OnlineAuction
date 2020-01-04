module.exports.welcome = async (req, res) => {
  res.render("home");
};

module.exports.search = async (req, res) => {
  res.send("Từ khoá search:" + req.query.keyword);
};

module.exports.profile = async (req, res) => {
  const user_info = {
    firstname: "Dần",
    lastname: "Trần",
    address: "Phau sần Ba Lây",
    email: "dantran.haingoai@gmail.com",
    username: "tientrivutru"
  };
  res.render("user/profile", { user_info });
};

module.exports.category = async (req, res) => {
  CategoryID = req.query.id;
  PageID = req.query.page ? req.query.page : 1; // default là 1
  console.log('Đây là id của trang category: ' + CategoryID);
  console.log('Đây là page của trang category: ' + PageID);
  // demo: http://localhost:3000/product/category?id=7&page=2
  
  const caterogry_name = [
    {
      ID: 0,
      itemName: "Lô 6 người Do Thái",
      price: "180.000.000",
      top1: "Hitler",
      postDate: "23/10/2019",
      timeLeft: "3 ngày",
      numOfBid: "26",
      imgLink: "/public/images/jews.jpg"
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
  res.render("products/item-caterogry", { caterogry_name });
};
