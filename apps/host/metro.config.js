// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('@module-federation/repack/babelTransformer'),
};

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    '@module-federation/runtime': require.resolve('@module-federation/runtime'),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
