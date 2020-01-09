var adminModel = require('../models/admin.model');
var productModel = require('../models/product.model');
// var catModel = require('../models/category.model');
const moment = require("moment");
//const config = require("../config/default.json");
moment.locale("vi");

module.exports.welcome = async (req, res) => {
  if (!res.locals.login)
    res.redirect('/admin/login');
  else
    res.render('admin/index');
};

module.exports.showCategory = async (req, res) => {
  const list = [
    { CatID: 1, CatName: "Laptop" },
    { CatID: 2, CatName: "Smartphone" },
    { CatID: 3, CatName: "Tablet" },
    { CatID: 4, CatName: "Quần áo" },
    { CatID: 5, CatName: "Giày dép" },
    { CatID: 6, CatName: "Trang sức" }
  ];
  res.render("vwCategories/index", {
    categories: list,
    empty: list.length === 0
  });
};

module.exports.test = async (req, res) => {
  res.render("bs", {
    layout: false
  });
};

module.exports.login = async (req, res) => {
  if(req.session.isAdmin) {
    res.redirect("/admin/mngr");
  }
  else {
    res.render("admin/login", { layout: false });
  }
}

module.exports.postLogin = async (req, res) => {
  const ad = await adminModel.getAdminName(req.body.adminName);

  if (ad === null) {

    return res.render("admin/login", { layout: false, err_message: 'Invalid name or password!' });
  }

  if (req.body.password !== ad.password) {
    return res.render("admin/login", { layout: false, err_message: 'Invalid name or password!' });
  }

  delete ad.password;
  req.session.isAdmin = true;
  req.session.authAd = ad;

  res.redirect('/admin/mngr')
}

module.exports.mngr = async (req, res) => {
  const catRaw = await adminModel.listAllCategories();
  const prodRaw = await productModel.getItems();
  const biddersRaw = await adminModel.listAllBidders();
  const sellersRaw = await adminModel.listAllSellers();

  const cats = catRaw.map(raw => {
    return {
      catID: raw.id,
      catName: raw.catName,
      bigCatID: raw.bigCatID
    }
  })

  const prods = prodRaw.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND'
      }),
      top1: row.bestbidder,
      postDate: row.ngaydang.toLocaleString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(row.ngaydang),
      numOfBid: row.bids,
      imgLink: row.imgLink
    }
  })

  const bidders = biddersRaw.map(raw => {
    return {
      id: raw.id,
      firstName: raw.firstName,
      lastName: raw.lastName,
    }
  })

  const sellers = sellersRaw.map(raw => {
    return {
      id: raw.id,
      firstName: raw.firstName,
      lastName: raw.lastName,
    }
  })
  res.render("admin/mngr", { layout: false, categories: cats, products: prods, bidders: bidders, sellers: sellers });
}

module.exports.logout = async (req, res) => {
  req.session.isAdmin = false;
  req.session.authAd = null;

  res.redirect('/admin/login');
}

module.exports.delete = async (req, res) => {
  const count = await productModel.countByCat(req.body.id);
  if (count == 0) {
    await adminModel.delCat(req.body.id);
    return res.redirect('/admin/mngr');
  }
  return res.redirect('/admin/mngr');
}

module.exports.deleteBidder = async (req, res) => {
  await adminModel.delBid(req.body.id);
  res.redirect('/admin/mngr');
}

module.exports.edit = async (req, res) => {
  await adminModel.editCat(req.body.id, req.body.newName);
  res.redirect('/admin/mngr');
}

module.exports.downgrade = async (req, res) => {
  await adminModel.downgrade(req.body.id);
  res.redirect('/admin/mngr');
}