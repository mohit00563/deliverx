const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'deliverx',
    password: 'Mnbmnbmnb@123',
    port: 5432
});

(async () => {
    try {
        const result = await pool.query('SELECT * FROM drivers WHERE is_available = true');
        console.log('Available drivers:', result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        await pool.end();
    }
})();
