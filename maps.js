// maps.js
require('dotenv').config();  // Load environment variables from .env file

const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

async function getDistanceAndDuration(origin, destination) {
  try {
    const response = await client.directions({
      params: {
        origin: origin, // e.g., 'New York, NY'
        destination: destination, // e.g., 'Los Angeles, CA'
        key: process.env.GOOGLE_MAPS_API_KEY, // Use the API key from .env file
        departure_time: 'now', // Real-time traffic info
      },
    });

    const legs = response.data.routes[0].legs[0];
    console.log(`Distance: ${legs.distance.text}`);
    console.log(`Duration (with traffic): ${legs.duration_in_traffic.text}`);
  } catch (error) {
    console.error('Error fetching directions:', error);
  }
}

// Example usage:
getDistanceAndDuration('New York, NY', 'Los Angeles, CA');
