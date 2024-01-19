// Import necessary dependencies
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import Screen1 from './Screen1';
import Screen2 from './Screen2';

// Create a stack navigator
const Stack = createStackNavigator();

// Functional component for your stack navigator
const MyStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="HomeScreen" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
    </Stack.Navigator>
  );
};

export default MyStackNavigator;
