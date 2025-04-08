import React from 'react';
import type {PropsWithChildren} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
// @ts-ignore:
import {NavigationContainer} from '@react-navigation/native';

type Props = PropsWithChildren<{}>;

const AppLayout: React.FC<Props> = ({children}) => {
  const backgroundStyle = {
    backgroundColor: '#fff',
  };

  return <NavigationContainer>{children}</NavigationContainer>;
};

const styles = StyleSheet.create({});

export default AppLayout;
