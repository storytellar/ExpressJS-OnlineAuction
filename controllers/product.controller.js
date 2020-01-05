const productModel = require("../models/product.model");
const moment = require("moment");
moment.locale("vi");

module.exports.search = async (req, res) => {
  res.send("Từ khoá search:" + req.query.keyword);
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
    }
  ];
  res.render("product/item-caterogry", { caterogry_name });
};

module.exports.showDetailItem = async (req, res) => {
  let productID = !isNaN(req.params.id) ? req.params.id : -1;
  let productInfo = await productModel.getItem(productID);
  let bestBidder = await productModel.getBestBidder(productID);
  let productImages = await productModel.getProductImages(productID);
  let relativeProductImages = await productModel.getFiveRelativeProductImages(productID);
  
  let fullData = {
    sellerID: productInfo[0].sellerID,
    sellerName: productInfo[0].SellerFirstName + ' ' + productInfo[0].SellerLastName,
    sellerStar: productInfo[0].SellerPercentStar * 5,
    productID: productInfo[0].id,
    productCategoryID: productInfo[0].catalogeID,
    productName: productInfo[0].prodName,
    productImages: productImages,
    productDescription: productInfo[0].prodDes,
    productIsSold: productInfo[0].isSold,
    displayPrice: ( bestBidder[0].Price ? bestBidder[0].Price : productInfo[0].initPrice)? (bestBidder[0].Price ? bestBidder[0].Price : productInfo[0].initPrice).toLocaleString({
      style: 'currency',
      currency: 'VND',
    }): 0, 
    buyNowPrice: productInfo[0].instantPrice,
    startDate: moment(productInfo[0].startDate).startOf('hours').fromNow(), // moment(1580041786000).from(row.ngaydang)
    endDate: moment(productInfo[0].endDate).fromNow(),
    calcTime: (Date.now()/1000 - productInfo[0].startDate/1000) / (productInfo[0].endDate/1000 - productInfo[0].startDate/1000) * 100,
    bidderID: bestBidder[0].bidderID,
    bidderName: bestBidder[0].lastName,
    relativeProductImages: relativeProductImages,
  }

  if(!fullData.productName){
    res.render("404.hbs", {layout: false});
    return;
  }
  console.log(fullData);
  
  
  res.render("product/item-detail", {data: fullData});
};
