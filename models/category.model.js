const db = require('../utils/db');

// Lấy Menu cấp 1
module.exports.getAllBigCategory = () => {
    return db.load('SELECT * FROM bigCataloge');
}

// Lấy Menu cấp 2
module.exports.getAllCataloge = () => {
    return db.load('SELECT * FROM cataloge');
}
