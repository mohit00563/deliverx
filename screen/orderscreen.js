// screens/OrderScreen.js

import React, { useState } from 'react';
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

const OrderScreen = ({ route, navigation }) => {
  // Sample cart items, you can replace this with dynamic cart data
  const [cart, setCart] = useState([
    { name: 'Pizza', price: 12.99 },
    { name: 'Burger', price: 8.49 },
  ]);

  const proceedToCheckout = () => {
    navigation.navigate('Checkout');  // Navigate to Checkout Screen (you can create this screen later)
  };

  return (
    <View>
      <Text>Order Screen</Text>
      <Cart cart={cart} proceedToCheckout={proceedToCheckout} />
    </View>
  );
};

export default OrderScreen;
