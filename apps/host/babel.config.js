module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    'module:metro-react-native-babel-preset',
  ],
  plugins: ['@babel/plugin-transform-flow-strip-types'],
};
