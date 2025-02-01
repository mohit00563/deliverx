const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'deliverx',
  password: 'Mnbmnbmnb@123',
  port: 5432,
});

module.exports = pool;
