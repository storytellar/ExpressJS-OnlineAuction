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
      price: row.giahientai,
      top1: row.bestbidder,
      postDate: row.ngaydang.toLocaleDateString("vi-VN"),
      timeLeft: moment(1580041786000).from(row.ngaydang), // truyen vao ngay ket thuc
      numOfBid: row.bids,
      imgLink: "/public/images/jews.jpg",
      isLoved: true
    };
  });
  top5xuhuong = rawData_Top5XuHuong.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai,
      top1: row.bestbidder,
      postDate: row.ngaydang.toLocaleDateString("vi-VN"),
      timeLeft: moment(1580041786000).from(row.ngaydang), // truyen vao ngay ket thuc
      numOfBid: row.bids,
      imgLink: "/public/images/jews.jpg",
      isLoved: true
    };
  });
  top5sieupham = rawData_Top5SieuPham.map(row => {
    return {
      ID: row.id,
      itemName: row.prodName,
      price: row.giahientai,
      top1: row.bestbidder,
      postDate: row.ngaydang.toLocaleDateString("vi-VN"),
      timeLeft: moment(1580041786000).from(row.ngaydang), // truyen vao ngay ket thuc
      numOfBid: row.bids,
      imgLink: "/public/images/jews.jpg",
      isLoved: true
    };
  });

  res.render("home", {
    top5ketthuc,
    top5xuhuong,
    top5sieupham
  });
};
