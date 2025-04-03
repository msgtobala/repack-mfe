import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
import pkj from './package.json' with { type: 'json' };
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default env => {
  const {mode} = env;

  const compileNodeModules = [
    // Add every react-native package that needs compiling
    // 'react-native-gesture-handler',
  ].map(moduleName => path.resolve(__dirname, `node_modules/${moduleName}`));

  return {
    mode,
    context: __dirname,
    entry: './index.web.js',
    output: {
        publicPath: 'http://localhost:3000/',
      },
    devServer: {
      port: 3000,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
      extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
      alias: {
        'react-native$': 'react-native-web',
      },
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
        {
          test: /\.[jt]sx?$/,
          include: [
            path.resolve(__dirname, 'App.tsx'),
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'component'),
            ...compileNodeModules,
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['module:metro-react-native-babel-preset'],
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.svg$/,
          use: [{loader: '@svgr/webpack'}],
        },
        {
          test: /\.(gif|jpe?g|png|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: '[name].[ext]',
          },
        },
        {
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
        },
      ],
    },
    plugins: [
      new Repack.RepackPlugin({
        platform: 'web',
      }),
      new ModuleFederationPlugin({
        name: 'host',
        exposes: {
            // Example: './MyComponent': './src/components/MyComponent',
        },
        remotes: {
          app1: `app1@http://localhost:3001/web/mf-manifest.json`,
          app2: `app2@http://localhost:3002/web/mf-manifest.json`,
        },
        shared: Object.fromEntries(
          Object.entries(pkj.dependencies).map(([dep, version]) => [
            dep,
            {singleton: true, eager: true, requiredVersion: version},
          ]),
        ),
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html'),
      }),
    ],
  };
}; 