var adminModel = require('../models/admin.model');
//const bcrypt = require('bcryptjs');

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
  res.render("admin/login", {layout:false});
}

module.exports.postLogin = async (req, res) => {
  const ad = await adminModel.getAdminName(req.body.adminName);

  if(ad === null){
    
    return res.render("admin/login", {layout:false, err_message: 'Invalid name or password!'});
  }

  if(req.body.password !== ad.password){
    return res.render("admin/login", {layout:false, err_message: 'Invalid name or password!'});
  }

  delete ad.password;
  req.session.isAuthenticated = true;
  req.session.authUser = ad;

  res.redirect('/admin/mngr')
}

module.exports.logout = async (req, res) => {
  req.session.isAuthenticated = false;
  req.session.authUser = null;

  res.redirect('/admin/login');
}