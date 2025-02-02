// server.js
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const { Pool } = require('pg');
const { calculateSmartPricing } = require('./utils');  // Import the function
const app = express();

// Database connection pool setup
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.HOST || 'localhost',
    database: process.env.DELIVERX, 
    password: process.env.PASSWORD,
    port: process.env.PG_PORT || 5432,  // Default to 5432 if no PG_PORT provided
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Example route to place an order
app.post('/place-order', async (req, res) => {
    const { user_id, business_id, items, urgency, distance } = req.body;

    // Calculate the base price (you may calculate it based on items selected)
    const basePrice = items.reduce((total, item) => total + item.price, 0);  // Example base price calculation

    // Calculate smart pricing based on urgency and distance
    const finalPrice = calculateSmartPricing(basePrice, urgency, distance);

    try {
        // Create a new order in the database with the calculated final price
        const result = await pool.query(
            'INSERT INTO orders (user_id, business_id, total_price) VALUES ($1, $2, $3) RETURNING id',
            [user_id, business_id, finalPrice]
        );

        const orderId = result.rows[0].id;

        // Respond with order details
        res.status(201).json({
            message: 'Order placed successfully',
            orderId,
            totalPrice: finalPrice,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to place the order' });
    }
});

// New route to submit the order along with live location
app.post('/submitOrder', async (req, res) => {
    const { location, order } = req.body;  // Location (lat, lon) and order details
    const { latitude, longitude } = location;
    const { user_id, business_id, items, urgency, distance } = order;

    // Calculate the base price (you may calculate it based on items selected)
    const basePrice = items.reduce((total, item) => total + item.price, 0);  // Example base price calculation

    // Calculate smart pricing based on urgency and distance
    const finalPrice = calculateSmartPricing(basePrice, urgency, distance);

    try {
        // Insert order data into the database along with the user's location
        const result = await pool.query(
            'INSERT INTO orders (user_id, business_id, total_price, latitude, longitude) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [user_id, business_id, finalPrice, latitude, longitude]
        );

        const orderId = result.rows[0].id;

        // Respond with order details
        res.status(201).json({
            message: 'Order placed successfully',
            orderId,
            totalPrice: finalPrice,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to place the order' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.post('/payment', async (req, res) => {
  const { amount } = req.body; // Ensure that the amount is passed in the request body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in cents
      currency: 'usd',
      payment_method_types: ['card'], // Specify the accepted payment method types (card in this case)
    });

    // Send the client secret to the frontend to complete the payment
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).send('Payment processing error');
  }
});

app.post('/create-subscription', async (req, res) => {
    const { userId, plan } = req.body; // userId is the Stripe Customer ID
    
    try {
      // Logic to get the appropriate priceId based on the plan selected
      const priceId = getPriceIdBasedOnPlan(plan); // You need to create this function
  
      // Create the subscription for the user
      const subscription = await stripe.subscriptions.create({
        customer: userId,  // The user ID (from Stripe)
        items: [{ price: priceId }],  // The plan price ID for the subscription
        expand: ['latest_invoice.payment_intent'],  // Expand to get payment intent details
      });
  
      res.status(200).json({ subscriptionId: subscription.id });
    } catch (error) {
      console.error('Subscription creation error:', error);
      res.status(500).send('Error creating subscription');
    }
  });
  
  const express = require('express');
  const cors = require('cors');
  
  
  const PORT = process.env.PORT || 3000; // ✅ Use dynamic port
  
  app.use(cors());
  app.use(express.json());
  
  app.get('/', (req, res) => {
    res.send('Backend is running successfully!');
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  