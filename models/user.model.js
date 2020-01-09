const db = require('../utils/db');

const productModel = require("../models/product.model");

const bcrypt = require('bcryptjs');
module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        throw new Error('Hashing failed', error)
    }
}

module.exports.isValid = async (req, password) => {
    bcrypt.compare(req, password, function (err, res) {
        // res == true
        console.log(res);
        return res;
    })
}
// Example
// Nếu muốn dùng hàm này phải dùng async await
// module.exports.all = async () => {
//   db.load('select * from users')
// };

module.exports.isAvailable = async email => {
    const raw = await db.load(`SELECT COUNT(*) AS count FROM user WHERE user.email = '${email}' `);

    if (raw[0].count == 0) {
        //console.log(raw[0].count);
        return true;
    }
    else {
        // console.log(raw[0].count);
        return false;
    }
}

module.exports.addUser = async user => {
    userEntity = {
        username: user.email,
        password: user.password,
        email: user.email,
        isSeller: 0,
        firstName: user.firstname,
        lastName: user.lastname,
        address: user.address

    };


    await db.add(userEntity, 'user');
}

module.exports.getUserName = async username => {
    const rows = await db.load(`SELECT * FROM user as urs WHERE urs.username  = '${username}'`);
    //console.log(rows);
    // console.log(rows.length);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];

}

module.exports.getByID = async  id => {
    const rows = await db.load(`SELECT * FROM user as urs WHERE urs.id  = '${id}'`);
    //console.log(rows);
    //console.log(rows.length);

    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}


module.exports.getWishlistByID = async id =>{
    const wishlist = await db.load(`SELECT p.* FROM product as p, wishlist as wl WHERE wl.userID  = '${id}' && wl.productID = p.id`);
   // const top1 = await productModel.getBestBidder();
    //const highestPrice = 

    for (let wish in wishlist) {
        //console.log(wishlist[wish].id);
        wishlist[wish]['imgLink'] = (await productModel.getProductImages(wishlist[wish].id))[0].imgLink;
        wishlist[wish]['isLoved'] = true;
        wishlist[wish]['top1'] = (await productModel.getBestBidder(wishlist[wish].id))[0].lastName + ' ' + (await productModel.getBestBidder(wishlist[wish].id))[0].firstName ;
        wishlist[wish]['highestPrice'] = (await productModel.getBestBidder(wishlist[wish].id))[0].Price.toLocaleString({
            style: 'currency',
            currency: 'VND'
        });
        wishlist[wish].initPrice = wishlist[wish].initPrice.toLocaleString({
          style: 'currency',
          currency: 'VND'
        });
      }
    // console.log('abc'+ wishlist[0]);
    // console.log(wishlist.length);  
    return wishlist;
}

module.exports.getAuchoningByID = async id => {
    const auchoning = await db.load(`SELECT DISTINCT p.* FROM product as p, bidders AS b WHERE b.bidderID = '${id}' && b.productID = p.id && p.endDate > NOW()`);
    console.log(auchoning[0].prodName);
    //const tmp = (await productModel.getProductImages(auchoning[1].id));
    //console.log(tmp);
    for (let item in auchoning) {
       //console.log('Test in' + auchoning[item].id);
        auchoning[item]['imgLink'] = (await productModel.getProductImages(auchoning[item].id))[0].imgLink;
        auchoning[item]['isLoved'] = true;
        auchoning[item]['top1'] = (await productModel.getBestBidder(auchoning[item].id))[0].lastName + ' ' + (await productModel.getBestBidder(auchoning[item].id))[0].firstName ;
        auchoning[item]['highestPrice'] = (await productModel.getBestBidder(auchoning[item].id))[0].Price.toLocaleString({
            style: 'currency',
            currency: 'VND'
        });
        auchoning[item].initPrice = auchoning[item].initPrice.toLocaleString({
          style: 'currency',
          currency: 'VND'
        });
      }
      //console.log(auchoning[0]);
      return auchoning;
}

module.exports.getWonListByID = async id => {
    const wontlist = await db.load(`SELECT p.* FROM product as p, bidders as b WHERE p.id = b.productID && b.bidderID = ${id} &&
    ((p.isSold = 1 ) || (p.endDate < NOW()))`);

    for(let item in wontlist) {
        wontlist[item]['isSold'] = 1;
        wontlist[item]['imgLink'] = (await productModel.getProductImages(auchoning[item].id))[0].imgLink;
        wontlist[item]['instantPrice'] = (await productModel.getBestBidder(auchoning[item].id))[0].Price.toLocaleString({
            style: 'currency',
            currency: 'VND'
        });
    }
    
    console.log(wontlist);


    return wontlist;
}

module.exports.updateUser = async (userEntity,id) => {
    //console.log('zzzzzzz ' userEntity)
    console.log(userEntity);
   return await db.patch(userEntity, {id: id}, 'user');
}

module.exports.upgradeToSeller = async (id) => {
   // const entity = {isSeller: 100};
    return await db.patch({isSeller: 100}, {id: id}, 'user');
}