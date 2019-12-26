const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: '165.22.103.114',
  port: 3306,
  user: 'sieuchoden',
  password: '123456',
  database: 'sieuchoden'
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
  load: sql => pool_query(sql),
  add: (entity, table) => pool_query(`insert into ${table} set ?`, entity),
  del: (condition, table) => pool_query(`delete from ${table} where ?`, condition),
  patch: (entity, condition, table) => pool_query(`update ${table} set ? where ?`, [entity, condition]),
};
