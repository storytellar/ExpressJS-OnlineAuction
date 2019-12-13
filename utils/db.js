var mysql = require("mysql");
const util = require("util");

// UI login for MySQL
// https://sv1.tuoihocsinh.com/etc/apps/phpmyadmin
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "18.138.175.246",
  user: "thai",
  password: "eju2eqe4a",
  database: "zadmin_thai"
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
  load: sql => pool_query(sql),
  add: (entity, table) => pool_query(`insert into ${table} set ?`, entity),
  del: (condition, table) => pool_query(`delete from ${table} where ?`, condition),
  patch: (entity, condition, table) => pool_query(`update ${table} set ? where ?`, [entity, condition]),
};

