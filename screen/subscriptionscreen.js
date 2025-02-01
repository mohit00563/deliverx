import React from 'react';
import { View, Button } from 'react-native';

const SubscriptionScreen = () => {
  const handleSubscription = (plan) => {
    // Handle the subscription logic here (e.g., calling backend API)
    console.log(`User selected the ${plan} plan`);
    // You can navigate to payment or confirmation screen
  };

  return (
    <View>
      <Button title="Basic Plan" onPress={() => handleSubscription('basic')} />
      <Button title="Plus Plan" onPress={() => handleSubscription('plus')} />
      <Button title="Pro Plan" onPress={() => handleSubscription('pro')} />
    </View>
  );
};

export default SubscriptionScreen;
