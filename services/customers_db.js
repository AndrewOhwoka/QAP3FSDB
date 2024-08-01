const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Auth',
  password: 'Confidence',
  port: 5433,
});
module.exports = pool;