var mysql = require("mysql");
var pool = mysql.createPool({
  // UI login for MySQL
  // https://sv1.tuoihocsinh.com/etc/apps/phpmyadmin
  connectionLimit: 10,
  host: "18.138.175.246",
  user: "thai",
  password: "eju2eqe4a",
  database: "zadmin_thai"
});

pool.query("SELECT 1 + 1 AS solution", function(error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

module.exports.load = sql => {
  pool_query(sql);
};
