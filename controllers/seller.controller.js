var sellerModel = require('../models/seller.model');
var catModel = require('../models/category.model');
const moment = require("moment");
const bcrypt = require('bcryptjs');
moment.locale("vi");

module.exports.welcome = async (req, res) => {
    if (!res.locals.login)
        res.redirect('/seller/login');
    else
        res.render('seller/index');
};

module.exports.login = async (req, res) => {
    if (req.session.isSeller) {
        res.redirect('seller/mngr');
    }
    else {
        res.render("seller/login", { layout: false });
    }
}

module.exports.postLogin = async (req, res) => {
    const seller = await sellerModel.getUser(req.body.sellerName);

    if (seller === null) {
        return res.render("seller/login", { layout: false, err_message: 'Invalid name or password!' });
    }

    const rs = bcrypt.compareSync(req.body.password, seller.password);

    if (!rs) {
        return res.render("seller/login", { layout: false, err_message: 'Invalid name or password!' });
    }

    if (seller.isSeller == 0) {
        return res.render("seller/login", { layout: false, err_message: 'Invalid name or password!' });
    }

    delete seller.password;
    req.session.isSeller = true;
    req.session.authSeller = seller;


    res.redirect('/seller/mngr');
}

module.exports.logout = async (req, res) => {
    req.session.isSeller = false;
    req.session.authSeller = null;

    res.redirect('/seller/login');
}

module.exports.mngr = async (req, res) => {
    const sellerInfo = req.session.authSeller;
    const productOnSaleRaw = await sellerModel.productOnsale(sellerInfo.id);
    const productSoldRaw = await sellerModel.productSold(sellerInfo.id);
    const catRaw = await catModel.getAllCataloge();

    const cats = catRaw.map(row => {
        return {
            catID: row.id,
            catName: row.catName,
        }
    })

    const productOnSale = productOnSaleRaw.map(row => {
        return {
            ID: row.id,
            itemName: row.prodName,
            price: row.giahientai.toLocaleString({
                style: 'currency',
                currency: 'VND'
            }),
            top1: row.bestbidder,
            postDate: row.ngaydang.toLocaleString("vi-VN"),
            timeLeft: moment(row.ketthuc).from(row.ngaydang),
            numOfBid: row.bids,
            imgLink: row.imgLink
        }
    });

    const productSold = productSoldRaw.map(row => {
        return {
            ID: row.id,
            itemName: row.prodName,
            price: row.giahientai.toLocaleString({
                style: 'currency',
                currency: 'VND'
            }),
            top1: row.bestbidder,
            postDate: row.ngaydang.toLocaleString("vi-VN"),
            timeLeft: moment(row.ketthuc).from(row.ngaydang),
            numOfBid: row.bids,
            imgLink: row.imgLink
        }
    });

    res.render("seller/mngr", { layout: false, cats: cats, productOnSale: productOnSale, productSold: productSold });
}

module.exports.addProduct = async (req, res) => {
    const product = {
        catalogeID: Number(req.body.catName),
        prodName: req.body.prodName,
        prodDes: req.body.prodDes.replace(/(<([^>]+)>)/ig, ''),
        isSold: 0,
        sellerID: req.session.authSeller.id,
        initPrice: Number(req.body.startPrice),
        stepPrice: Number(req.body.stepPrice),
        instantPrice: Number(req.body.instantPrice),
        startDate: moment().toDate(),
        endDate: req.body.endDate
    }

    if (product.prodName === '' || product.prodDes === '' || product.initPrice >= product.instantPrice
        || product.stepPrice > product.instantPrice ) {
        return res.redirect('/seller/mngr');
    }

    sellerModel.addProduct(product);
    const temp = await sellerModel.selectLastIndex();

    const img = {
        prodID: temp[0].id,
        imgLink: "http://placehold.it/750x500"
    }

    const bid = {
        productID: temp[0].id,
        bidderID: req.session.authSeller.id,
        priceBid: temp[0].initPrice,
        dateBid: temp[0].startDate,
    }

    await sellerModel.addImg(img);
    await sellerModel.initBid(bid);

    res.redirect('/seller/mngr');
}