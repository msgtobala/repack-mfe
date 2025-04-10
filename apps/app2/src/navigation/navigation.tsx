import * as React from 'react';

// @ts-ignore:
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// @ts-ignore:
import {NavigationContainer} from '@react-navigation/native';
import ClaimsDetailsScreen from './ClaimsDetails';
import {Text} from 'react-native';
import ClaimsPaymentScreen from './ClaimsPaymentScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ClaimsDetails"
            component={ClaimsDetailsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ClaimsPayment"
            component={ClaimsPaymentScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootStack;
