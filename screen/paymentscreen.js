import React from 'react';
import { View, Button } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  const { confirmPayment } = useStripe();

  const handlePayment = async () => {
    // Fetch client secret from your backend
    const { clientSecret } = await fetch('/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 20 }), // Pass the amount dynamically
    }).then((res) => res.json());

    // Confirm payment using Stripe API
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails: { name: 'User' }, // Add more details if necessary
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent) {
      console.log('Payment successful:', paymentIntent);
      // Handle successful payment (e.g., navigate to confirmation screen)
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        onCardChange={(cardDetails) => {
          console.log(cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('Focused field', focusedField);
        }}
      />
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;

import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'https://deliverx.onrender.com'; // Change this to your deployed backend URL when live 

const PaymentScreen = () => {
  const makePayment = async () => {
    try {
      const response = await axios.post(`${API_URL}/payment`, { amount: 20 });

      console.log('Payment Response:', response.data);
      Alert.alert('Payment Success!', `Client Secret: ${response.data.clientSecret}`);
    } catch (error) {
      console.error('Payment Error:', error);
      Alert.alert('Payment Failed', 'Something went wrong');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Complete Your Payment</Text>
      <Button title="Pay ₹20" onPress={makePayment} />
    </View>
  );
};

export default PaymentScreen;
