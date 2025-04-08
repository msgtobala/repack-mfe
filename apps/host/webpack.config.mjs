import path from 'path';
import webpack from 'webpack';
import {createRequire} from 'module';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {ModuleFederationPlugin} from '@module-federation/enhanced/webpack';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');
const appDirectory = path.resolve(import.meta.dirname);
const {presets, plugins} = require(`${appDirectory}/babel.config.js`);
const compileNodeModules = [].map(moduleName =>
  path.resolve(appDirectory, `node_modules/${moduleName}`),
);
// const {ModuleFederationPlugin} = require('webpack').container;

const diabledPackages = [
  '@module-federation/runtime',
  '@react-navigation/elements',
  '@react-navigation/native',
  '@react-navigation/native-stack',
];

const babelLoaderConfiguration = {
  test: /\.[jt]sx?$/,
  include: [
    path.resolve(appDirectory, 'App.tsx'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'component'),
    ...compileNodeModules,
  ],
  exclude: /node_modules\/(?!react-native)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['module:metro-react-native-babel-preset'],
      cacheDirectory: true,
      sourceMaps: true, // Ensure Babel generates source maps
      presets,
      plugins,
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [{loader: '@svgr/webpack'}],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {name: '[name].[ext]'},
  },
};

const tsLoaderConfiguration = {
  test: /\.(ts)x?$/,
  exclude: [/node_modules|\.d\.ts$/],
  use: {
    loader: 'ts-loader',
    options: {
      compilerOptions: {
        noEmit: false,
      },
    },
  },
};

export default {
  entry: {
    app: path.join(appDirectory, 'index.web.js'),
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native/Libraries/NewAppScreen': false, // Ignore it entirely
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      tsLoaderConfiguration,
      {
        test: /\.[jt]sx?$/,
        resolve: {
          fullySpecified: false,
        },
        include:
          /node_modules\/(@react-navigation|react-native-screens|react-native-safe-area-context)/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.join(appDirectory, 'index.html')}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({__DEV__: JSON.stringify(true)}),
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'host.container.bundle',
      remotes: {},
      shared: Object.fromEntries(
        Object.entries(pkg.dependencies)
          .filter(([dep]) => !diabledPackages.includes(dep))
          .map(([dep, {version}]) => {
            return [
              dep,
              {singleton: true, eager: true, requiredVersion: version},
            ];
          }),
      ),
    }),
  ],
};
