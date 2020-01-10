const productModel = require("../models/product.model");
const moment = require("moment");
moment.locale("vi");
// Trang chủ
module.exports.welcome = async (req, res) => {
  // Lấy data dạng thô về, sau đó map thành dạng attributes đẹp phía dưới
  // Có thể console.log thử ra để xem dạng data
  const [
    rawData_Top5KetThuc,
    rawData_Top5XuHuong,
    rawData_Top5SieuPham
  ] = await Promise.all([
    productModel.getFiveEndingProducts(),
    productModel.getFiveTrendingProducts(),
    productModel.getFiveSuperProducts()
  ]);
  
  top5ketthuc = rawData_Top5KetThuc.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND',
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleDateString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(), // truyen vao ngay ket thuc
      numOfBid: row.bids,
      imgLink: row.imgLink,
      isLoved: true,
      uID: req.session.authUser ? req.session.authUser.id : 0
    };
  });
  top5xuhuong = rawData_Top5XuHuong.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND',
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleDateString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(), // truyen vao ngay ket thuc
      numOfBid: row.bids,
      imgLink: row.imgLink,
      isLoved: true,
      uID: req.session.authUser ? req.session.authUser.id : 0
    };
  });
  top5sieupham = rawData_Top5SieuPham.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai.toLocaleString({
        style: 'currency',
        currency: 'VND',
      }),
      top1: row.bestbidder.replace(/^.{3}/g, '***'),
      postDate: row.ngaydang.toLocaleDateString("vi-VN"),
      timeLeft: moment(row.ketthuc).from(), // truyen vao ngay ket thuc
      numOfBid: row.bids,
      imgLink: row.imgLink,
      isLoved: true,
      uID: req.session.authUser ? req.session.authUser.id : 0
    };
  });
  
  res.render("home", {
    top5ketthuc,
    top5xuhuong,
    top5sieupham
  });
};
