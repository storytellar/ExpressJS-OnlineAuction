const db = require('../utils/db');

module.exports.getUser = async username => {
    const rows = await db.load(`SELECT * FROM user as urs WHERE urs.username  = '${username}'`);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}

module.exports.isSeller = async username => {
    const res = db.load(`SELECT isSeller FROM user as urs WHERE urs.username  = '${username}'`);
    if (res == 1)
        return true;
    return false;
}

module.exports.productOnsale = async id => {
    return db.load(`SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
    (SELECT COUNT(b2.bidderID)
    FROM bidders b2 WHERE b2.productID = p.id
    GROUP BY b2.productID) as bids, i.imgLink, p.prodDes
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.isSold = 0 AND i.prodID = p.id AND p.sellerID = ${id}
    AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
                    FROM bidders bt
                    WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id)`)
}

module.exports.productSold = async id => {
    return db.load(`SELECT p.id, p.prodName, p.startDate AS ngaydang, p.endDate AS ketthuc, u.username AS bestbidder, b.priceBid AS giahientai, 
    (SELECT COUNT(b2.bidderID)
    FROM bidders b2 WHERE b2.productID = p.id
    GROUP BY b2.productID) as bids, i.imgLink, p.prodDes
FROM product p, bidders b, bidders b2, user u, img i
WHERE p.isSold = 1 AND i.prodID = p.id AND p.sellerID = ${id}
    AND (u.id, b.priceBid) = (SELECT bt.bidderID, bt.priceBid
                    FROM bidders bt
                    WHERE priceBid = (SELECT MAX(priceBid) FROM bidders WHERE bt.productID = productID AND bt.productID = p.id GROUP BY productID))
GROUP BY (p.id)`)
}

module.exports.addProduct = async (entities) => {
    await db.add(entities, 'product');
}

module.exports.addImg = async (entities) => {
    await db.add(entities, 'img')
}

module.exports.initBid = async (entities) => {
    await db.add(entities, 'bidders')
}

module.exports.selectLastIndex = async () => {
    return db.load('SELECT * FROM product p ORDER BY p.id DESC LIMIT 1')
}

module.exports.update = (id, name) => {
    return db.load(`update product set prodDes = CONCAT(prodDes, '${name}') where id = ${id}`);
}