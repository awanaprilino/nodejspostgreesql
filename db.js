const Pool = require("pg").Pool;

const pool = new Pool({
  host: "ec2-34-239-241-25.compute-1.amazonaws.com",
  database: "dbem69s6ah1k6r",
  user: "isdwfhjgezpgep",
  port: 5432,
  password: "031c65a450fe207355829c48895129ff6e97db761655ade0fa050ff15e4054bb",
});

module.exports = pool;
