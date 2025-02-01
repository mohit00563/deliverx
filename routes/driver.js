const express = require('express');
const router = express.Router(); // Initialize the router
const pool = require('../db'); // Import the database pool from db.js

// Route to get available drivers
router.get('/available', async (req, res) => {
  try {
    console.log("Querying available drivers...");
    // Check if the pool is connected before making the query
    const client = await pool.connect();
    console.log("Database connected successfully!");

    const result = await pool.query('SELECT * FROM drivers WHERE is_available = true');
    console.log("Drivers fetched:", result.rows);  // Log the result rows to the console
    res.json(result.rows);  // Return the available drivers as JSON

    client.release(); // Release the client back to the pool after query

  } catch (error) {
    console.error('Error retrieving available drivers:', error);
    res.status(500).json({ error: 'Failed to retrieve available drivers' });
  }
});

module.exports = router;  // Export the router properly
