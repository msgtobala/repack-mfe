import React from 'react';
import {StyleSheet} from 'react-native';
// @ts-ignore:
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens';
import Header from './components/Header/Header';

const linking = {
  prefixes: ['http://localhost:8080'], // or your domain
  config: {
    screens: {
      Home: '',
      AppOne: 'appone',
      AppTwo: {
        path: 'apptwo',
        screens: {
          ClaimsDetails: 'details',
          ClaimsPayment: 'payment',
        },
      },
    },
  },
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer linking={linking}>
      <Header />
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
