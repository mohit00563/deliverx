// routes/orders.js

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Initialize the pool (if it's not already initialized in server.js)
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.HOST,
    database: process.env.DELIVERX,
    password: process.env.PASSWORD,
    port: process.env.PG_PORT || 5432
});

// Define the POST route to place orders
router.post('/', async (req, res) => {
    const { user_id, order_type, status, total_price, order_lat, order_lon } = req.body;
    
    try {
        // Step 1: Place the order in the database
        const result = await pool.query(
            'INSERT INTO orders (user_id, order_type, status, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, order_type, status, total_price]
        );
        const newOrder = result.rows[0];

        // Step 2: Find the nearest available driver
        const driversResult = await pool.query(
            'SELECT * FROM drivers WHERE is_available = true'
        );
        const drivers = driversResult.rows;

        let nearestDriver = null;
        let minDistance = Infinity;

        // Step 3: Calculate the distance to each available driver and find the nearest one
        for (let driver of drivers) {
            const driverLat = driver.latitude;
            const driverLon = driver.longitude;
            const distance = haversine(order_lat, order_lon, driverLat, driverLon);
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestDriver = driver;
            }
        }

        // Step 4: Assign the driver to the order if a driver is found
        if (nearestDriver) {
            // Update the driver's availability and assign the order
            await pool.query(
                'UPDATE drivers SET is_available = false, current_order_id = $1 WHERE id = $2',
                [newOrder.id, nearestDriver.id]
            );

            // Update the order with the assigned driver's ID
            await pool.query(
                'UPDATE orders SET driver_id = $1 WHERE id = $2',
                [nearestDriver.id, newOrder.id]
            );

            res.status(201).json({ message: 'Order placed and driver assigned', order: newOrder });
        } else {
            res.status(400).json({ error: 'No available drivers found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to place order and assign driver' });
    }
});

// Export the router to use in server.js
module.exports = router;
