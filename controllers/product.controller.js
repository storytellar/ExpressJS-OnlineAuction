const productModel = require("../models/product.model");
const moment = require("moment");
const config = require("../config/default.json");
moment.locale("vi");

module.exports.search = async (req, res) => {
  const [total, rows] = await Promise.all([
    productModel.getTotalItems(req.query.keyword),
    productModel.getAllItems(req.query.keyword)
  ])

  const caterogry_name = rows.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND'
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })

  res.render("product/item-search", {
    keyword: req.query.keyword,
    caterogry_name: caterogry_name,
    empty: rows.length === 0
  });
};

module.exports.searchAsc = async (req, res) => {
  const [total, rows] = await Promise.all([
    productModel.getTotalItems(req.body.keyword),
    productModel.getAllItemsAsc(req.body.keyword)
  ])

  const caterogry_name = rows.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND'
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })

  res.render("product/item-search", {
    keyword: req.body.keyword,
    caterogry_name: caterogry_name,
    empty: rows.length === 0
  });
};

module.exports.searchDesc = async (req, res) => {
  const [total, rows] = await Promise.all([
    productModel.getTotalItems(req.body.keyword),
    productModel.getAllItemsDesc(req.body.keyword)
  ])

  const caterogry_name = rows.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND'
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })

  res.render("product/item-search", {
    keyword: req.body.keyword,
    caterogry_name: caterogry_name,
    empty: rows.length === 0
  });
};

module.exports.searchAscDate = async (req, res) => {
  const [total, rows] = await Promise.all([
    productModel.getTotalItems(req.body.keyword),
    productModel.getAllItemsAscDate(req.body.keyword)
  ])

  const caterogry_name = rows.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND'
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })

  res.render("product/item-search", {
    keyword: req.body.keyword,
    caterogry_name: caterogry_name,
    empty: rows.length === 0
  });
};

module.exports.searchDescDate = async (req, res) => {
  const [total, rows] = await Promise.all([
    productModel.getTotalItems(req.body.keyword),
    productModel.getAllItemsDescDate(req.body.keyword)
  ])

  const caterogry_name = rows.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND'
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })

  res.render("product/item-search", {
    keyword: req.body.keyword,
    caterogry_name: caterogry_name,
    empty: rows.length === 0
  });
};

module.exports.category = async (req, res) => {
  const [total, rows] = await Promise.all([
    productModel.countByCat(req.query.id),
    productModel.getProductsByCat(req.query.id)
  ])

  const caterogry_name = rows.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND'
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(row.ngaydang),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })

  res.render("product/item-caterogry", {
    id: req.query.id,
    caterogry_name: caterogry_name,
    empty: rows.length === 0
  });
};

module.exports.categoryAsc = async (req, res) => {
  const [total, rows] = await Promise.all([
    productModel.countByCat(req.body.id),
    productModel.getProductsByCatAsc(req.body.id)
  ])

  const caterogry_name = rows.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND'
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(row.ngaydang),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })

  res.render("product/item-caterogry", {
    id: req.body.id,
    caterogry_name: caterogry_name,
    empty: rows.length === 0
  });
};

module.exports.categoryDesc = async (req, res) => {
  const [total, rows] = await Promise.all([
    productModel.countByCat(req.body.id),
    productModel.getProductsByCatDesc(req.body.id)
  ])

  const caterogry_name = rows.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND'
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(row.ngaydang),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })

  res.render("product/item-caterogry", {
    id: req.body.id,
    caterogry_name: caterogry_name,
    empty: rows.length === 0
  });
};

module.exports.categoryAscDate = async (req, res) => {
  const [total, rows] = await Promise.all([
    productModel.countByCat(req.body.id),
    productModel.getProductsByCatAscDate(req.body.id)
  ])

  const caterogry_name = rows.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND'
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(row.ngaydang),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })

  res.render("product/item-caterogry", {
    id: req.body.id,
    caterogry_name: caterogry_name,
    empty: rows.length === 0
  });
};

module.exports.categoryDescDate = async (req, res) => {
  const [total, rows] = await Promise.all([
    productModel.countByCat(req.body.id),
    productModel.getProductsByCatDescDate(req.body.id)
  ])

  const caterogry_name = rows.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND'
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(row.ngaydang),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })

  res.render("product/item-caterogry", {
    id: req.body.id,
    caterogry_name: caterogry_name,
    empty: rows.length === 0
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
  if (!req.session.isUser){
    res.redirect('/user/login');
  }

  let productInfo = await productModel.getItem(req.params.id);
  console.log(productInfo.instantPrice);
  // if (req.body.bidprice) {
  // console.log(req.body.bidprice);
  // }
  // else {console.log('null');}
  // console.log(req.session.isAuthenticated);
  if (req.session.isUser){
    var bidprice = req.body.bidprice;
    console.log('is Bidprice available? ' + bidprice);
    if (req.body.bidprice === undefined || req.body.bidprice === null){
      const instantPrice = (await productModel.getItem(req.params.id))[0].instantPrice;
      bidprice = instantPrice;
      productModel.setProductBought(req.params.id);
      console.log('Buy now with price: ' + instantPrice);
    }
    productModel.addBidderbyID(req.session.authUser.id, req.params.id, bidprice);
    res.redirect('/user/profile');

  }
 
}