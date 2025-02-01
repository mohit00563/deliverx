import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import HomeScreen from './screens/HomeScreen';  // Example screen
import PaymentScreen from './screens/PaymentScreen'; // Payment screen
import SubscriptionScreen from './screens/SubscriptionScreen'; // Subscription screen

const Stack = createStackNavigator();

function App() {
  return (
    <StripeProvider publishableKey="your_stripe_publishable_key">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

export default App;
