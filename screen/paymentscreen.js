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
