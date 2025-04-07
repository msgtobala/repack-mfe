import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {HtmlRspackPlugin} from '@rspack/core';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
// import pkj from './package.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      presets: ['module:metro-react-native-babel-preset'],
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

export default env => {
  const {mode} = env;

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    devServer: {
      port: 3001,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
    },
    resolve: {
      extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
      alias: {
        'react-native$': 'react-native-web',
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
      uniqueName: 'polaris-web-app1',
    },
    plugins: [
      new HtmlRspackPlugin({template: path.join(__dirname, 'index.html')}),
      new RspackModuleFederationPlugin({
        name: 'app1',
        filename: 'app1.container.bundle',
        exposes: {
          './MemberCard': './src/components/MemberCard',
        },
        // shared: Object.fromEntries(
        //   Object.entries(pkg.dependencies).map(([dep, version]) => [
        //     dep,
        //     {singleton: true, eager: true, requiredVersion: version},
        //   ]),
        // ),
      }),
    ],
  };
};
