import path from 'path';
import webpack from 'webpack';
import {createRequire} from 'module';
import {ModuleFederationPlugin} from '@module-federation/enhanced/webpack';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');
const appDirectory = path.resolve(import.meta.dirname);
const {presets, plugins} = require(`${appDirectory}/babel.config.js`);
// const {ModuleFederationPlugin} = require('webpack').container;

const compileNodeModules = [].map(moduleName =>
  path.resolve(appDirectory, `node_modules/${moduleName}`),
);

const babelLoaderConfiguration = {
  test: /\.[jt]sx?$/,
  include: [
    path.resolve(appDirectory, 'App.tsx'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'component'),
    ...compileNodeModules,
  ],
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      sourceMaps: true,
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
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(appDirectory, 'dist'),
    },
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-vector-icons$': 'react-native-vector-icons/dist/index.js',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      tsLoaderConfiguration,
    ],
  },
  output: {
    publicPath: 'auto',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({__DEV__: JSON.stringify(true)}),
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'app2.container.js',
      exposes: {
        './UpcomingAppointments': './src/components/UpcomingAppointments',
      },
      disableTypeGeneration: true,
      dts: false,
      shared: Object.fromEntries(
        Object.entries(pkg.dependencies).map(([dep, {version}]) => [
          dep,
          {singleton: true, eager: true, requiredVersion: version},
        ]),
      ),
    }),
  ],
};
