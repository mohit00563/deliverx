// screens/CheckoutScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const CheckoutScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Checkout Screen</Text>
      {/* Here, you can add payment details, order summary, etc. */}
      <Button title="Confirm Order" onPress={() => alert('Order Confirmed!')} />
    </View>
  );
};

export default CheckoutScreen;
