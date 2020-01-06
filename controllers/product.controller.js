const productModel = require("../models/product.model");
const moment = require("moment");
const config = require("../config/default.json");
moment.locale("vi");

module.exports.search = async (req, res) => {
  res.send("Từ khoá search:" + req.query.keyword);
};

module.exports.category = async (req, res) => {
  CategoryID = req.query.id;
  PageID = req.query.page ? req.query.page : 1; // default là 1
  // console.log('Đây là id của trang category: ' + CategoryID);
  // console.log('Đây là page của trang category: ' + PageID);
  // for (const c of res.locals.lcCategories) {
  //   if (c.CatID === +req.params.catId) {
  //     c.isActive = true;
  //   }
  // }

  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;

  const [total, rows] = await Promise.all([
    productModel.countByCat(req.query.id),
    productModel.pageByCat(req.query.id, offset)
  ])

  const nPages = Math.ceil(total / config.pagination.limit);
  const page_items = [];
  for (i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      isActive: i === page
    }
    page_items.push(item);
  }

  //const raw = await productModel.getProductsByCat(req.query.id);
  const caterogry_name = rows.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.instantPrice,
      top1: row.bestbidder,
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(row.ngaydang),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })
  //console.log(caterogry_name);

  res.render("product/item-caterogry", {
    caterogry_name: caterogry_name,
    empty: rows.length === 0,
    page_items,
    can_go_prev: page > 1,
    can_go_next: page < nPages,
    prev_value: page - 1,
    next_value: page + 1
  });
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
    instantPrice: productInfo[0].instantPrice,
    displayInstantPrice: productInfo[0].instantPrice.toLocaleString({
      style: 'currency',
      currency: 'VND',
    }) ,
    displayPrice: (bestBidder[0].Price ? bestBidder[0].Price : productInfo[0].initPrice) ? (bestBidder[0].Price ? bestBidder[0].Price : productInfo[0].initPrice).toLocaleString({
      style: 'currency',
      currency: 'VND',
    }) : 0,
    buyNowPrice: productInfo[0].instantPrice,
    startDate: moment(productInfo[0].startDate).startOf('hours').fromNow(), // moment(1580041786000).from(row.ngaydang)
    endDate: moment(productInfo[0].endDate).fromNow(),
    calcTime: (Date.now() / 1000 - productInfo[0].startDate / 1000) / (productInfo[0].endDate / 1000 - productInfo[0].startDate / 1000) * 100,
    bidderID: bestBidder[0].bidderID,
    bidderName: bestBidder[0].lastName,
    relativeProductImages: relativeProductImages,
  }

  if (!fullData.productName) {
    res.render("404.hbs", { layout: false });
    return;
  }
  console.log(fullData);
  console.log(fullData.displayInstantPrice);

  res.render("product/item-detail", { data: fullData });
};


module.exports.bidingAndBuy = async (req, res) => {
  if (!req.session.isAuthenticated){
    res.redirect('/user/login');
  }
  // console.log(req);
  // if (req.body.bidprice) {
  // console.log(req.body.bidprice);
  // }
  // else {console.log('null');}
  // console.log(req.session.isAuthenticated);
  if (req.session.isAuthenticated){
    var bidprice = req.body.bidprice;
    if (!req.body.bidprice){
      let instantPrice = await productModel.getItem(req.params.id).instantPrice;
      bidprice = instantPrice;
      
    }
    productModel.addBidderbyID(req.session.authUser.id, req.params.id, bidprice);
    productModel.setProductBought(req.params.id);
    // let productInfo = await productModel.getItem(req.params.id);
    res.redirect('/user/profile');



  }
 
}