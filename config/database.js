const { createPool } = require('mysql');

const pool = createPool({
  // host: process.env.MYSQL_HOST,
  // port: process.env.MYSQL_PORT,
  // user: process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  // database: process.env.MYSQL_DATABASE,
  // connectionLimit: 10,

  host: 'db-mysql-blr1-64166-do-user-7529154-0.a.db.ondigitalocean.com',
  port: 25060,
  user: 'test',
  password: 'y6uvfff32dyo5ruj',
  database: 'mgnitt',
  connectionLimit: 10,
  insecureAuth: true,
});

module.exports = pool;
