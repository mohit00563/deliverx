const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'deliverx',
  password: 'Mnbmnbmnb@123', // Replace with your actual password
  port: 5432,
});

async function testConnection() {
  try {
    const result = await pool.query('SELECT * FROM drivers WHERE is_available = true');
    console.log('Available drivers:', result.rows);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testConnection();
