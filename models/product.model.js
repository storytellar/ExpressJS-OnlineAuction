const db = require("../utils/db");

module.exports.getFiveEndingProducts = () => {
  return db.load(
    "SELECT p.id, p.prodName, p.startDate AS ngaydang, DATEDIFF(p.endDate, CURRENT_TIMESTAMP) AS conlai, u.username AS bestbidder, b.priceBid AS giahientai, COUNT(DISTINCT b2.bidderID) as bids FROM product p, bidders b, user u, bidders b2 WHERE p.id = b.productID and p.id = b2.productID and u.id = (SELECT bidderID FROM bidders bb WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bb.productID = productID) and bb.productID = p.id) and u.id = b.bidderID GROUP BY (b.productID) ORDER BY (CURRENT_TIMESTAMP - p.endDate) DESC LIMIT 5"
  );
};

module.exports.getFiveTrendingProducts = () => {
  return db.load(
    "SELECT p.id, p.prodName, p.startDate AS ngaydang, DATEDIFF(p.endDate, CURRENT_TIMESTAMP) AS conlai, u.username AS bestbidder, b.priceBid AS giahientai, COUNT(DISTINCT b2.bidderID) as bids FROM product p, bidders b, user u, bidders b2 WHERE p.id = b.productID and p.id = b2.productID and u.id = (SELECT bidderID FROM bidders bb WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bb.productID = productID) and bb.productID = p.id) and u.id = b.bidderID GROUP BY (b.productID) ORDER BY (COUNT(DISTINCT b2.bidderID)) DESC LIMIT 5"
  );
};

module.exports.getFiveSuperProducts = () => {
  return db.load(
    "SELECT p.id, p.prodName, p.startDate AS ngaydang, DATEDIFF(p.endDate, CURRENT_TIMESTAMP) AS conlai, u.username AS bestbidder, b.priceBid AS giahientai, COUNT(DISTINCT b2.bidderID) as bids FROM product p, bidders b, user u, bidders b2 WHERE p.id = b.productID and p.id = b2.productID and u.id = (SELECT bidderID FROM bidders bb WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bb.productID = productID) and bb.productID = p.id) and u.id = b.bidderID GROUP BY (b.productID) ORDER BY (b.priceBid) DESC LIMIT 5"
  );
};

module.exports.getItem = id => {
  return db.load(
    `SELECT P.*, U.firstName AS SellerFirstName, U.lastName AS SellerLastName, SUM(R.isPositive) / count(R.isPositive) AS SellerPercentStar FROM product P, user U, review R WHERE P.id = ${id} AND U.id = P.sellerID AND R.to = P.sellerID`
  );
};

module.exports.getBestBidder = productID => {
  return db.load(
    `SELECT max(B.priceBid) AS Price, B.bidderID, U.firstName, U.lastName FROM bidders B, user U where B.productID=${productID} and U.id = B.bidderID`
  );
};

module.exports.getProductImages = productID => {
  return db.load(
      `SELECT * FROM img WHERE prodID = ${productID}`
  );
};

module.exports.getFiveRelativeProductImages = productID => {
  return db.load(
      `SELECT I.* FROM product P1, product P2, img I WHERE P1.id = ${productID} and P1.catalogeID = P2.catalogeID and P2.id != P1.id and I.prodID = P2.id GROUP BY prodID Limit 5`
  );
};