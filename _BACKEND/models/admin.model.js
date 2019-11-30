const db = require('../utils/db');

// Example
// Nếu muốn dùng hàm này phải dùng async await
module.exports.all = () => {
  db.load('select * from users')
};
