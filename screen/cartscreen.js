// screens/CartScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const Cart = ({ cart, proceedToCheckout }) => {
  return (
    <View>
      {cart.map((item, index) => (
        <Text key={index}>{item.name} - ${item.price}</Text>
      ))}
      <Button title="Proceed to Checkout" onPress={() => proceedToCheckout()} />
    </View>
  );
};

// Example CartScreen with Cart component
const CartScreen = ({ route, navigation }) => {
  const { cart } = route.params; // Get the cart items from navigation params

  const proceedToCheckout = () => {
    navigation.navigate('Checkout');  // Navigate to Checkout Screen (you can create this screen later)
  };

  return (
    <View>
      <Cart cart={cart} proceedToCheckout={proceedToCheckout} />
    </View>
  );
};

export default CartScreen;
