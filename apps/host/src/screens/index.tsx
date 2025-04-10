import * as React from 'react';
import HomeScreen from './HomeScreen';
// @ts-ignore:
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApponeScreen from './ApponeScreen';
import ApptwoScreen from './ApptwoScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="AppTwo" options={{headerShown: false}}>
        {() => <ApptwoScreen />}
      </Stack.Screen>
      <Stack.Screen
        name="AppOne"
        component={ApponeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
