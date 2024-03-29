const categoryModel = require("../models/category.model");
const productModel = require("../models/product.model");

// Lấy thông tin Category ở thanh Menu
module.exports.getMenu = async (req, res, next) => {
  let listBigCategory = await categoryModel.getAllBigCategory();
  let listSmallCategory = await categoryModel.getAllCataloge();
  let Menu = listBigCategory.map(row => {
    let SubMenu = []

    listSmallCategory.forEach(e => {
      if (e.bigCatID === row.id){
        SubMenu.push(e);
      }
    });

    return {
      ID: row.id,
      Name: row.BCName,
      SubMenu: SubMenu
    };
  });
  
  res.locals.lcMenu = Menu;
  

  next();
};

module.exports.getAuthUser = async (req, res, next) => {
   if (req.session.isUser === null) {
     req.session.isUser = false;
   }

   res.locals.lcAuthenticated = req.session.isUser;
   res.locals.lcAuthUser = req.session.authUser;

   next();
};
