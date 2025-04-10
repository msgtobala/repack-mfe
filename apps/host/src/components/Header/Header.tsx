import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// @ts-ignore:
import {Link} from '@react-navigation/native';
//@ts-ignore
import {Button} from '@react-navigation/elements';

import {
  useNavigation,
  //@ts-ignore
} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {/* Logo */}
      <Image
        source={{
          uri: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
        }} // Replace with your logo URL or local image
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Menu Links */}
      <View style={styles.menu}>
        <Button onPress={() => navigation.navigate('Home')}>Home</Button>
        <Button onPress={() => navigation.navigate('AppOne')}>App 1</Button>
        <Button onPress={() => navigation.navigate('AppTwo')}>App 2</Button>
        {/* <Link screen="AppOne">App 1</Link> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
  },
  logo: {
    width: 100,
    height: 40,
  },
  menu: {
    flexDirection: 'row',
  },
  menuItem: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default Header;
