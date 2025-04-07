module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['babel-plugin-syntax-hermes-parser', 'react-native-paper/babel'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
