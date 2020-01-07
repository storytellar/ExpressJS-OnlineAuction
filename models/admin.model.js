const db = require('../utils/db');

// Example
// Nếu muốn dùng hàm này phải dùng async await
// module.exports.all = async () => {
//   db.load('select * from users')
// };

module.exports.listAllBidders = async () => {
  return db.load('SELECT u.id, u.firstName, u.lastName FROM `user` u');
};

module.exports.listAllSellers = async () => {
   return db.load('SELECT u.id, u.firstName, u.lastName FROM `user` u WHERE u.isSeller = 1');
};

module.exports.listAllCategories = async () => {
  return db.load('SELECT * FROM cataloge');
}

module.exports.delCat = id => db.del({ id: id }, 'cataloge');

module.exports.delBid = id => db.del({ id: id }, 'user');

module.exports.editCat = (id, name) => {
  const condition = { id: id };
  return db.patch({ catName: name }, condition, 'cataloge');
}

module.exports.downgrade = id => {
  const condition = { id: id };
  return db.patch({ isSeller: 0 }, condition, 'user');
}

module.exports.getAdminName = async adminName => {
  const rows = await db.load(`SELECT * FROM admin a WHERE a.adminName = '${adminName}'`);
  if(rows.length > 0){
    return rows[0];
  }

  return null;
}