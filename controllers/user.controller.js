var userModel = require('../models/user.model');
var productModel = require('../models/product.model')
//const bcrypt = require('bcryptjs');

module.exports.welcome = async (req, res) => {
  res.render("home");
};

module.exports.login = async (req, res) => {
  if (req.session.isUser) {
    res.redirect("/user/profile");
  }
  else {
    res.render("user/login", {
      layout: false
    });
  }

};

module.exports.postLogin = async (req, res) => {
  const urs = await userModel.getUserName(req.body.username);
  const isValid = userModel.isValid(req.body.password, urs.password);

  if (!isValid) {
    console.log('Cant Validate ' + isValid);
    return res.render("user/login", { layout: false, err_message: 'Invalid name or password!' });
  }

  delete urs.password;
  delete isValid;
  req.session.isUser = true;
  req.session.authUser = urs;

  console.log(req.query.retUrl);
  if (req.query.retUrl) {
    res.redirect(req.query.retUrl);
  }
  else {
    res.redirect('/user/profile')
  }
};

module.exports.signup = async (req, res) => {
  res.render("user/signup", { layout: false });
};

module.exports.postSignup = async (req, res) => {
  const isAvailable = await userModel.isAvailable(req.body.email);
  delete req.body.confirm_password;
  req.body.password = await userModel.hashPassword(req.body.password);
  console.log(req.body, isAvailable);

  if (isAvailable === true) {
    console.log('Email Available');


    // to model
    const result = await userModel.addUser(req.body);

    // alert("Đăng ký thành công, \nBạn sẽ được chuyển tới trang đăng nhập.");
    res.render("user/login", { layout: false });
    console.log(result);
  }
  else console.log();

  delete isAvailable;
};


module.exports.profile = async (req, res) => {

  user_info = req.session.authUser;

  isCurrent = true;
  if (req.query.id) {
    isCurrent = false;

    user_info = await userModel.getByID(req.query.id);
    console.log('ID: ' + user_info.id);



  }

  // console.log(req.query);
  //console.log(isCurrent);
  wishlist = await userModel.getWishlistByID(user_info.id);

  //console.log(wishlist[0]);
  // const wishlistViewModel = wishlist.map(async each => {
  //   return {
  //     id: each.id,
  //     prodName: each.prodName,
  //     //imgLink: await productModel.getProductImages(each.id),
  //     initPrice: each.initPrice.toLocaleString({
  //       style: 'currency',
  //       currency: 'VND'
  //     }),
  //     startDate: each.startDate,
  //     endDate: each.endDate,
  //   }
  // });

  for (let wish in wishlist) {
    wishlist[wish]['imgLink'] = (await productModel.getProductImages(wishlist[wish].id))[0].imgLink;
    wishlist[wish].initPrice = wishlist[wish].initPrice.toLocaleString({
      style: 'currency',
      currency: 'VND'
    });
  }



  console.log(wishlist[0]);
  res.render("user/profile", { user_info, isCurrent, wishlistViewModel: wishlist });
};

module.exports.signout = (req, res) => {
  req.session.isUser = false;
  req.session.authUser = null;

  res.redirect('/user/login');
}

module.exports.category = async (req, res) => {
  const caterogry_name = [
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
      imgLink: "/public/images/jews.jpg",
    },
    {
      ID: 3,
      itemName: "Lô 90 người Do Thái",
      price: "180.000.000",
      top1: "Hitler",
      postDate: "23/10/2019",
      timeLeft: "3 ngày",
      numOfBid: "26",
      imgLink: "/public/images/jews.jpg",
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
  res.render("user/item-caterogry", { caterogry_name });
}

