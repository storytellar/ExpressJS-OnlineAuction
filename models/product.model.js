const db = require('../utils/db');

module.exports.getFiveEndingProducts = () => {
    return db.load('SELECT p.id, p.prodName, p.startDate AS ngaydang, DATEDIFF(p.endDate, CURRENT_TIMESTAMP) AS conlai, u.username AS bestbidder, b.priceBid AS giahientai, COUNT(DISTINCT b2.bidderID) as bids FROM product p, bidders b, user u, bidders b2 WHERE p.id = b.productID and p.id = b2.productID and u.id = (SELECT bidderID FROM bidders bb WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bb.productID = productID) and bb.productID = p.id) and u.id = b.bidderID GROUP BY (b.productID) ORDER BY (CURRENT_TIMESTAMP - p.endDate) DESC LIMIT 5');
}

module.exports.getFiveTrendingProducts = () => {
    return db.load('SELECT p.id, p.prodName, p.startDate AS ngaydang, DATEDIFF(p.endDate, CURRENT_TIMESTAMP) AS conlai, u.username AS bestbidder, b.priceBid AS giahientai, COUNT(DISTINCT b2.bidderID) as bids FROM product p, bidders b, user u, bidders b2 WHERE p.id = b.productID and p.id = b2.productID and u.id = (SELECT bidderID FROM bidders bb WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bb.productID = productID) and bb.productID = p.id) and u.id = b.bidderID GROUP BY (b.productID) ORDER BY (COUNT(DISTINCT b2.bidderID)) DESC LIMIT 5');
}

module.exports.getFiveSuperProducts = () => {
    return db.load('SELECT p.id, p.prodName, p.startDate AS ngaydang, DATEDIFF(p.endDate, CURRENT_TIMESTAMP) AS conlai, u.username AS bestbidder, b.priceBid AS giahientai, COUNT(DISTINCT b2.bidderID) as bids FROM product p, bidders b, user u, bidders b2 WHERE p.id = b.productID and p.id = b2.productID and u.id = (SELECT bidderID FROM bidders bb WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bb.productID = productID) and bb.productID = p.id) and u.id = b.bidderID GROUP BY (b.productID) ORDER BY (b.priceBid) DESC LIMIT 5');
}