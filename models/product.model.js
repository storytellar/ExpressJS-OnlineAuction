const db = require("../utils/db");
const config = require("../config/default.json")

module.exports.getFiveEndingProducts = () => {
  return db.load(
    `SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
		(SELECT COUNT(b2.bidderID)
		FROM bidders b2 WHERE b2.productID = p.id
		GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.isSold = 0 AND i.prodID = p.id
		AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
						FROM bidders bt
						WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id) ORDER BY (CURRENT_TIMESTAMP - p.endDate) DESC LIMIT 5`
  );
};

module.exports.getFiveTrendingProducts = () => {
  return db.load(
    `SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
		(SELECT COUNT(b2.bidderID)
		FROM bidders b2 WHERE b2.productID = p.id
		GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.isSold = 0 AND i.prodID = p.id
		AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
						FROM bidders bt
						WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id) ORDER BY (bids) DESC LIMIT 5`
  );
};

module.exports.getFiveSuperProducts = () => {
  return db.load(
    `SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
		(SELECT COUNT(b2.bidderID)
		FROM bidders b2 WHERE b2.productID = p.id
		GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.isSold = 0 AND i.prodID = p.id
		AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
						FROM bidders bt
						WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id) ORDER BY (b.priceBid) DESC LIMIT 5`
  );
};

module.exports.getItem = id => {
  return db.load(
    `SELECT P.*, U.firstName AS SellerFirstName, U.lastName AS SellerLastName, SUM(R.isPositive) / count(R.isPositive) AS SellerPercentStar FROM product P, user U, review R WHERE P.id = ${id} AND U.id = P.sellerID AND R.to = P.sellerID`
  );
};

module.exports.getBestBidder = productID => {
  return db.load(
    `SELECT b.priceBid AS Price, b.bidderID, u.firstName, u.lastName
    FROM bidders b, user u, product p
    WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE b.productID = productID GROUP BY productID)
        AND b.bidderID = u.id AND p.id = b.productID AND p.id = ${productID}`
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

module.exports.getProductsByCat = catID => {
  return db.load(
    `SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
		(SELECT COUNT(b2.bidderID)
		FROM bidders b2 WHERE b2.productID = p.id
		GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.catalogeID = ${catID} AND p.isSold = 0 AND i.prodID = p.id
		AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
						FROM bidders bt
						WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id)`
  )
};

module.exports.getProductsByCatAsc = catID => {
  return db.load(
    `SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
		(SELECT COUNT(b2.bidderID)
		FROM bidders b2 WHERE b2.productID = p.id
		GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.catalogeID = ${catID} AND p.isSold = 0 AND i.prodID = p.id
		AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
						FROM bidders bt
						WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id) ORDER BY (b.priceBid)`
  )
};

module.exports.getProductsByCatDesc = catID => {
  return db.load(
    `SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
		(SELECT COUNT(b2.bidderID)
		FROM bidders b2 WHERE b2.productID = p.id
		GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.catalogeID = ${catID} AND p.isSold = 0 AND i.prodID = p.id
		AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
						FROM bidders bt
						WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id) ORDER BY (b.priceBid) DESC`
  )
};

module.exports.getProductsByCatAscDate = catID => {
  return db.load(
    `SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
		(SELECT COUNT(b2.bidderID)
		FROM bidders b2 WHERE b2.productID = p.id
		GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.catalogeID = ${catID} AND p.isSold = 0 AND i.prodID = p.id
		AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
						FROM bidders bt
						WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id) ORDER BY (CURRENT_TIMESTAMP - p.endDate) DESC`
  )
};

module.exports.getProductsByCatDescDate = catID => {
  return db.load(
    `SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
		(SELECT COUNT(b2.bidderID)
		FROM bidders b2 WHERE b2.productID = p.id
		GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.catalogeID = ${catID} AND p.isSold = 0 AND i.prodID = p.id
		AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
						FROM bidders bt
						WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id) ORDER BY (CURRENT_TIMESTAMP - p.endDate)`
  )
};

module.exports.countByCat = async catID => {
  const rows = await db.load(`select count(*) as total from product p where p.isSold = 0 and p.catalogeID = ${catID}`);
  return rows[0].total;
};

module.exports.pageByCat = async (catID, offset) => {
  return db.load(`SELECT p.id, p.prodName, p.startDate as ngaydang, p.endDate , u.username AS bestbidder, b.priceBid AS giahientai, COUNT(DISTINCT b2.bidderID) as bids, i.imgLink
  FROM product p, bidders b, user u, bidders b2, img i
  WHERE p.id = b.productID and p.id = b2.productID
        and u.id = (SELECT bidderID
                    FROM bidders bb 
                    WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bb.productID = productID) 
                          and bb.productID = p.id)
        and u.id = b.bidderID and i.prodID = p.id and p.catalogeID = ${catID} and p.isSold = 0
  GROUP BY (b.productID) limit ${config.pagination.limit} offset ${offset}`);
};


module.exports.addBidderbyID = async (userID, productID, price) => {
  bidderEntity = {
    bidderID: userID,
    productID: productID,
    priceBid: price,

  }
  const result = await db.add(bidderEntity, 'bidders');
  console.log(result);
};

module.exports.setProductBought = async (productID) => {
  boughtEntity = [
    {
      isSold: '1',
    },
    {
      id: '${productID}',
    }
  ]
  db.patch(boughtEntity[0], boughtEntity[1], 'product');
};

module.exports.getTotalItems = async (key) => {
  const rows = await db.load(`select count(*) as total from product p where p.isSold = 0 and p.prodName LIKE '%${key}%'`);
  return rows[0].total;
};

module.exports.getAllItems = (key) => {
  return db.load(`SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
  (SELECT COUNT(b2.bidderID)
  FROM bidders b2 WHERE b2.productID = p.id
  GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.isSold = 0 AND i.prodID = p.id AND p.prodName LIKE '%${key}%'
  AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
          FROM bidders bt
          WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id)`);
}

module.exports.getAllItemsAsc = (key) => {
  return db.load(`SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
  (SELECT COUNT(b2.bidderID)
  FROM bidders b2 WHERE b2.productID = p.id
  GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.isSold = 0 AND i.prodID = p.id AND p.prodName LIKE '%${key}%'
  AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
          FROM bidders bt
          WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id) ORDER BY (b.priceBid) ASC`);
}

module.exports.getAllItemsDesc = (key) => {
  return db.load(`SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
  (SELECT COUNT(b2.bidderID)
  FROM bidders b2 WHERE b2.productID = p.id
  GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.isSold = 0 AND i.prodID = p.id AND p.prodName LIKE '%${key}%'
  AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
          FROM bidders bt
          WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id) ORDER BY (b.priceBid) DESC`);
}

module.exports.getAllItemsAscDate = (key) => {
  return db.load(`SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
  (SELECT COUNT(b2.bidderID)
  FROM bidders b2 WHERE b2.productID = p.id
  GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.isSold = 0 AND i.prodID = p.id AND p.prodName LIKE '%${key}%'
  AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
          FROM bidders bt
          WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id) ORDER BY (CURRENT_TIMESTAMP - p.endDate) DESC`);
}

module.exports.getAllItemsDescDate = (key) => {
  return db.load(`SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
  (SELECT COUNT(b2.bidderID)
  FROM bidders b2 WHERE b2.productID = p.id
  GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.isSold = 0 AND i.prodID = p.id AND p.prodName LIKE '%${key}%'
  AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
          FROM bidders bt
          WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id) ORDER BY (CURRENT_TIMESTAMP - p.endDate)`);
}

module.exports.getItems = () => {
  return db.load(`SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
  (SELECT COUNT(b2.bidderID)
  FROM bidders b2 WHERE b2.productID = p.id
  GROUP BY b2.productID) as bids, i.imgLink
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.isSold = 0 AND i.prodID = p.id
  AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
          FROM bidders bt
          WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id)`);
}

module.exports.countLove = (uID, productID) => {
  return db.load(`SELECT count(*) as COUNT FROM wishlist WHERE userID=${uID} and productID=${productID}`);
}

module.exports.removeLove = (uID, productID) => {
  return db.load(`DELETE FROM wishlist WHERE (userID = ${uID} AND productID = ${productID})`);
}

module.exports.addLove = (uID, productID) => {
  return db.load(`INSERT INTO wishlist (userID, productID) VALUES (${uID}, ${productID})`);
}