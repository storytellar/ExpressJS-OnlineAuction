const db = require('../utils/db');

// Example
// Nếu muốn dùng hàm này phải dùng async await
// module.exports.all = async () => {
//   db.load('select * from users')
// };

module.exports.listAllBidders = async () => {
  return db.load('SELECT u.firstName, u.lastName FROM `user` u WHERE u.isSeller = 0');
};

module.exports.listAllSellers = async () => {
   return db.load('SELECT u.firstName, u.lastName FROM `user` u WHERE u.isSeller = 1');
};

module.exports.listAllCategories = async () => {
  return db.load('SELECT * FROM cataloge');
}

module.exports.getAdminName = async adminName => {
  const rows = await db.load(`SELECT * FROM admin a WHERE a.adminName = '${adminName}'`);
  console.log(rows);
  if(rows.length > 0){
    return rows[0];
  }

  return null;
}