const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "customers",
  password: "Confidence",
  port: 5432,
});
module.exports = pool;
